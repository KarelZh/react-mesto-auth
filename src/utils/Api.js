class Api {
  constructor(options) {
    this._options = options;
  }
  _checkResponse(res) {
    if (res.ok) {return res.json()}
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    }).then(this._checkResponse)
  }
  
  setUserInfo(name, about) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this._checkResponse)
  }

  generateCard(mesto, link) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: mesto,
        link: link
      }),
    }).then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  likeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  deleteLikeCard(id) {
    return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    }).then(this._checkResponse)
  }

  addAvatar(avatar) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then(this._checkResponse)
  }
}
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '9430b557-5691-4068-a9d3-25e6e6adc7cd',
    'Content-Type': 'application/json'
  }
});

export {api};
export {Api};
