import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { CurrentContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as Auth from './Auth'
import InfoTooltip from './InfoTooltip';
import ErrorTooltip from './ErrorTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [inInfoToolTips, setIsInfoToolTips] = useState(false);
  const [inErrorToolTips, setInErrorToolTip] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState(false);
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})


  const navigate = useNavigate();

  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      }).catch((err) => {
        console.error(err)
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setIsInfoToolTips(false)
    setInErrorToolTip(false)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleUpdateUser(item) {
    api.setUserInfo(item.name, item.about).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  function handleCardLike(likes, id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.likeCard(id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch((err) => {
      console.error(err)
    });
   
  }
  function handleDeleteLike(likes, id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.deleteLikeCard(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === id ? newCard : c));
    }).catch((err) => {
      console.error(err)
    });
  }
  function handleCardDelete(id) {
    api.deleteCard(id).then((res) => {
      setCards((res) => {return res.filter((n) => {
        return n._id !== id
      })})
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }
  function handleUpdateAvatar(item) {
    api.addAvatar(item.avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  function handleAddPlaceSubmit(item) {
    api.generateCard(item.mesto, item.link).then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((err) => {
      console.error(err)
    })
  }
  useEffect(() => {
    api.getInitialCards()
    .then((res) => {
      setCards(res)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const jwt = localStorage.getItem('jwt');
  
  useEffect(() => {
    if(jwt) {
      Auth.getContent(jwt).then((res) => {
        if(res.data) {
          setUserData(res.data)
          setLoggedIn(true)
          navigate('/')
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }, [jwt])

  function handleRegister({email, password}) {
    return Auth.register({email, password}).then((res) => {
      if(!res) throw new Error('Ошибка авторизации')
      if(res) {
        setIsInfoToolTips(true)
        return res;
      }
    }).catch((err) => {
      setInErrorToolTip(true)
      console.error(err)
    })
  }

  function handleLogin({email, password}) {
    return Auth.authorize({email, password}).then((res) => {
      if(!res) throw new Error('Неправильный email или пароль')
      if(res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true)
        navigate('/')
      }
    }).catch((err) => {
      console.error(err)
    })
  }
  return (
    <>
      <CurrentContext.Provider value={currentUser}>
      <Header 
        userData={userData}
      /> 
        <Routes>
          <Route path='/sign-up' element={<Register onRegister={handleRegister}/>} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<ProtectedRoute
            card={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            deleteCardLike={handleDeleteLike}
            onCardClick={handleCardClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            element={Main} loggedIn={loggedIn} />} />
        </Routes>
        <Footer />
        <InfoTooltip 
          isOpen={inInfoToolTips}
          onClose={closeAllPopups}
        />
        <ErrorTooltip 
          isOpen={inErrorToolTips}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          buttonText='Да'
          children={
            <>
            <p className="popup__text">Вы уверены?</p>
            </>
          } />
        
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
          />
  
      </CurrentContext.Provider>
    </>
  );
}

export default App;
