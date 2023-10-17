import ping from '../images/ping.png'
import Card from './Card';
import { api } from '../utils/Api';
import { useState, useEffect, useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile, 
  onAddPlace, 
  onEditAvatar,
  onCardClick,
  onCardLike,
  deleteCardLike,
  card,
  onCardDelete
  }) {
    const currentMain = useContext(CurrentContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__content" onClick={onEditAvatar}>
          <img className="profile__image" src={currentMain.avatar} alt="Жак-ИвКусто" />
          <img className="profile__ping" src={ping} alt="Ручка" />
        </div>
        <div className="profile__info">
          <div className="profile__save">
            <h1 className="profile__name">{currentMain.name}</h1>
            <button className="profile__button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentMain.about}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
          {card.map((item) => (
            <Card 
              src={item.link}
              likeLength={item.likes.length}
              title={item.name}
              alt={item.name}
              onClick={onCardClick}
              key={item._id}
              idCard={item.owner._id}
              likes={item.likes}
              onCardLike={onCardLike}
              deleteLikeCard={deleteCardLike}
              id={item._id}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  )
}
export default Main;