import { useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [mesto, setMesto] = useState('');
  const [link, setLink] = useState('');
  function nameChange(e) {
    setMesto(e.target.value)
  }
  function linkChange(e) {
    setLink(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    const item = {mesto, link}
    onAddPlace(item)
  }
  return(
    <PopupWithForm 
      isOpen={isOpen}
      onClose={onClose}
      name='card'
      title='Новое место'
      buttonText='Создать'
      onSubmit={handleSubmit}
    >
      <input value={mesto} onChange={nameChange} minLength="2" maxLength="30" className="popup__info popup__info_type_mesto" type="text" name="mesto" placeholder="Название" required />
      <span id="mesto-error" className="popup__error"></span>
      <input value={link} onChange={linkChange} className="popup__info popup__info_type_link" type="url" name="link" placeholder="Ссылка на картинку" required />
      <span id="link-error" className="popup__error"></span>

    </PopupWithForm>
  )
}
export default AddPlacePopup;