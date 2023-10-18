import error from '../images/Union (2).png'

function ErrorTooltip({isOpen, onClose}) {
  return(
    <section className={`popup popup_type_succes ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__const">
        <button className="popup__close popup__close_type_succes" type="reset" onClick={onClose}></button>
        <div className="popup__container">
          <img className="popup__image__succes" src={error} />
          <p className="popup__text__succes">Что-то пошло не так! Попробуйте ещё раз.</p>
        </div>
      </div>
    </section>
  )
}
export default ErrorTooltip;