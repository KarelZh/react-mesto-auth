function PopupWithForm({name, title, children, isOpen, onClose, buttonText, onSubmit}) {
  return(
      <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__const">
          <button className={`popup__close popup__close_type_${name}`} type="reset" onClick={onClose}></button>
          <div className="popup__container">
            <p className="popup__text">{title}</p>
            <form action="" onSubmit={onSubmit} className={`popup__form popup__form_type_${name}`} name={name} noValidate>
              {children}
              <button className="popup__button popup__button_type_save" type="submit">{buttonText}</button>
            </form>
          </div>
        </div>
      </section>
  )
}
export default PopupWithForm;