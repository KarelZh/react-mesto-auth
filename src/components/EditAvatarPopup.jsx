import { useRef } from "react";
import PopupWithForm from "./PopupWithForm"
import Input from "./Input";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }
  return(
    <PopupWithForm
          isOpen={isOpen}
          onClose={onClose}
          name='avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          onSubmit={handleSubmit}
          >
            
            <Input ref={inputRef} extraClass="popup__info_type_avatar" type="url" name="avatar" placeholder="Ссылка на смену аватара" required />
            <span id="avatar-error" className="popup__error"></span>
            
    </PopupWithForm>      
  )
}
export default EditAvatarPopup;