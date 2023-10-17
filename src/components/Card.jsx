import { useContext } from "react";
import { CurrentContext } from "../contexts/CurrentUserContext";


function Card({src, alt, title, likeLength, onClick, idCard, likes, onCardLike, deleteLikeCard, id, onCardDelete}) {
const currentCard = useContext(CurrentContext);
const isOwn = idCard === currentCard._id;

const isLiked = likes.some((i) => {
   return i._id === currentCard._id
})
const cardLikeButtonClassName = ( 
  `element__button ${isLiked && 'element__button_type_like'}` 
);
const handleLikeClick = () => {
    deleteLikeCard(likes, id)
    onCardLike(likes, id)
}
const handleDeleteClick = () => {
  onCardDelete(id)
}

  return(
    <div className="element">
      <img className="element__image" src={src} alt={alt} onClick={() => onClick({src, alt})}/>
      {isOwn && <button className="element__reset" type="reset" onClick={handleDeleteClick} />}
        <div className="element__info">
          <p className="element__text">{title}</p>
            <div className="element__like">
              <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
              <span className="element__like_button">{likeLength}</span>
            </div>
        </div>
    </div>
    
  )
}
export default Card;