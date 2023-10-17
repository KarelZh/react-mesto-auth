import logo from '../images/logo.png'
function Header({name, userData}) {
  return(
    <header className="header">
        <img className="header__logo" src={logo} alt="Место" /> 
        <div className='header__info'>
          <p className='header__input'>{userData}</p>
          <button className='header__button'>{name}</button>
        </div>
    </header>
  )
}
export default Header;