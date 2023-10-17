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

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
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
  function auth(jwt) {
    return Auth.getContent(jwt).then((res) => {
      if(jwt) {
        setLoggedIn(true)
      }
    })
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth(jwt);
    }
  }, [])

  function handleRegister({email, password}) {
    return Auth.register({email, password}).then((res) => {
      if(!res) throw new Error('Ошибка авторизации')
      if(res) {
        return res;
      }
    })
  }

  function handleLogin({email, password}) {
    return Auth.authorize({email, password}).then((res) => {
      if(!res) throw new Error('Неправильный email или пароль')
      if(res.jwt) {
        localStorage.setItem('jwt', res.jwt);
        const userData = {
          email: res.email
        }
        setUserData(userData)
        setLoggedIn(true)
        navigate('/')
      }
    })
  }
  return (
    <>
      <CurrentContext.Provider value={currentUser}>
        <Routes>
          <Route path='/sign-up' element={<Register onRegister={handleRegister}/>} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route path='/' element={<ProtectedRoute element={
            <>
              <Header 
                name='Выйти'
                userData={userData}
              /> 
              <Main 
              card={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              deleteCardLike={handleDeleteLike}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              />
              <Footer />
            </>
          } loggedIn={loggedIn} />} />
        </Routes>
        
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
