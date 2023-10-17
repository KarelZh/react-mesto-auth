import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentContext)
  const [name, setName] = useState('');
  const [about, setAbout] = useState('')
  function nameChange(e) {
    setName(e.target.value)
  }
  function aboutChange(e) {
    setAbout(e.target.value)
  }
  useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name)
      setAbout(currentUser.about)
    }
  }, [currentUser, isOpen])
  function handleSubmit(e) {
    e.preventDefault();
    const item = {name, about}
    onUpdateUser(item)
  }
  return(
    <PopupWithForm 
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    name='information' 
    title='Редактировать профиль' 
    buttonText='Сохранить'
   >

      <input minLength="2" value={name} onChange={nameChange} maxLength="40" className="popup__info popup__info_type_name" type="text" name="name" placeholder="Имя" required />
      <span id="name-error" className="popup__error"></span>
      <input minLength="2" value={about} onChange={aboutChange} maxLength="200" className="popup__info popup__info_type_job" type="text" name="about" placeholder="Профессия" required />
      <span id="about-error" className="popup__error"></span>

    </PopupWithForm>
  )
}
export default EditProfilePopup;