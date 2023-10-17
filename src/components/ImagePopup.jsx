function ImagePopup({card, onClose}) {
  return(
    <section className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
      <div className="popup__const">
        <button className="popup__close popup__close_type_image" type="reset" onClick={onClose}></button>
        <div>
          <img className="popup__image" src={card?.src} alt={card?.alt}/>
          <p className="popup__name">{card?.alt}</p>
        </div>
      </div>
    </section>
  )
}
export default ImagePopup;