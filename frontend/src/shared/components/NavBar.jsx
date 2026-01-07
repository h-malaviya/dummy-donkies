import ThemeButton from './ThemeButton'
import NavButton from './NavButton'
import '../styles/navBar.scss'
import logo from '../../assets/icons/logo1.png'
import cart_icon from '../../assets/icons/cart.png'
import profile from '../../assets/icons/profile.png'
import { useState, useEffect } from 'react'
import { ROUTES } from '../../app/appConfig'
import { getClassNames } from '../utils/global'
import SearchBar from './SearchBar'
import useIsAdmin from '../../hooks/useIsAdmin'
import { useNavigate } from 'react-router-dom'

function NavBar({onSearch}) {
  const naviageTo = useNavigate()
  const isAdmin= useIsAdmin()
  const navLinks = isAdmin
    ? [
      { text: "Users", url: ROUTES.ADMIN_USERS },
      { text: "Products", url: ROUTES.ADMIN_PRODUCTS }
    ]
    : [
      { text: "Home", url: ROUTES.HOME },
     
    ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeAll();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const openMenu = () => {
    setIsMenuOpen(true);

  };

  const closeAll = () => {
    setIsMenuOpen(false);

  };

  return (
    <>
      <nav className="navbar">
        <div className="company-title">
          <button
            className={`menu-btn ${getClassNames(isMenuOpen, "open")}`}
            onClick={openMenu}

            aria-label="toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <img src={logo} alt="Logo" className="company-logo" onClick={() => naviageTo(isAdmin ? ROUTES.ADMIN : ROUTES.HOME)} />
          <h4 className='company-title' onClick={() => naviageTo(isAdmin ? ROUTES.ADMIN : ROUTES.HOME)}>Dummy Donkies</h4>
        </div>

        {!isMenuOpen && <div className="nav-links">
          {navLinks.map((i, idx) => (
            <NavButton key={idx} text={i.text} url={i.url} />
          ))}
          <ThemeButton className="theme-switch" />
        </div>}
        <div className="search-wrapper">
          <SearchBar onSearch={onSearch}  />
        </div>

        <div className="logos">
          {!isAdmin && <img
            src={cart_icon}
            alt="cart-icon"
            className="company-logo"
            onClick={() => naviageTo(ROUTES.CART)}
          />}

          <img
            src={profile}
            alt="profile-icon"
            className="company-logo"
            onClick={() => naviageTo(ROUTES.PROFILE)}

          />
        </div>
      </nav>

      <div
        className={`overlay ${getClassNames(isMenuOpen, "show")}`}
        onClick={closeAll}

      />
      <aside className={`sidebar ${getClassNames(isMenuOpen, "open")}`}>
        <button className="close-btn" onClick={closeAll}>
          ✕
        </button>

        {isMenuOpen && <div className="sidebar-links">

          {navLinks.map((i, idx) => (
            <NavButton
              key={idx}
              text={i.text}
              url={i.url}
              onClick={closeAll}

            />
          ))}
          <ThemeButton />
        </div>}
      </aside>


    </>
  )
}

export default NavBar