import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password }).then((res) => {
      navigate('/sign-in')
    })
  }

  return(
    <>
      <div className="register">
        <p className="register__name">
            Регистрация
        </p>
        <form onSubmit={handleSubmit} className="register__form">
          <input 
            className="register__input register__input_type_email" 
            name="email" 
            value={email} 
            onChange={({ target }) => setEmail(target.value)}
            type="email" 
            placeholder="Email" 
            minLength="2" 
            maxLength="30" 
            required
          />
          <input 
            className="register__input register__input_type_password" 
            name="password" 
            value={password} 
            onChange={({ target }) => setPassword(target.value)}
            type="password" 
            placeholder="Пароль" 
            minLength="2" 
            maxLength="30" 
            required
          />
          <button className="register__button">Зарегистрироваться</button>
        </form>
        <div className="register__footer">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="register__footer__link">Войти</Link></p>
          
        </div>
      </div>
    </>
  )
}
export default Register;