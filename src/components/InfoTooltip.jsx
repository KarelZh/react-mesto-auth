import union from '../images/Union (1).png'

function InfoTooltip({isOpen, onClose}) {
  return(
    <section className={`popup popup_type_succes ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__const">
        <button className="popup__close popup__close_type_succes" type="reset" onClick={onClose}></button>
        <div className="popup__container">
          <img className="popup__image__succes" src={union} />
          <p className="popup__text__succes">Вы успешно зарегистрировались!</p>
        </div>
      </div>
    </section>
  )
}
export default InfoTooltip;