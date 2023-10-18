import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email && password) {
      onLogin({ email, password }).then(() => {
        setEmail('');
        setPassword('');
        navigate('/');
      }).catch((err) => {
        console.error(err)
      })
    }
  }

  return(
    <>
      <div className="register">
        <p className="register__name">
            Вход
        </p>
        <form className="register__form" onSubmit={handleSubmit}>
          <input 
            className="register__input register__input_type_email" 
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
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password" 
            placeholder="Пароль" 
            minLength="2" 
            maxLength="30" 
            required
          />
          <button className="register__button">Войти</button>
        </form>
      </div>
    </>
  )
}
export default Login;