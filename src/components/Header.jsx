import { Route, Routes, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
function Header({userData}) {
  const navigate = useNavigate()
  return(
    <header className="header">
        <img className="header__logo" src={logo} alt="Место" /> 
        <Routes>
          <Route path='/' element={
            <div className='header__info'>
              <p className='header__input'>{userData?.email}</p>
              <button className='header__button' onClick={() => {
                localStorage.removeItem('jwt'); 
                navigate('/sign-in')}}>Выйти</button>
            </div>
          } />
          <Route path='/sign-in' element={
            <div className='header__info'>
              <button className='header__button' onClick={() => {navigate('/sign-up')}}>Регистрация</button>
            </div>
          } />
          <Route path='/sign-up' element={
            <div className='header__info'>
              <button className='header__button' onClick={() => {navigate('/sign-in')}}>Войти</button>
            </div>
          } />
        </Routes>
    </header>
  )
}
export default Header;