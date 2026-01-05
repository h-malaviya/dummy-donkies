import React from 'react'
import ThemeButton from './ThemeButton'
import NavButton from './NavButton'
import CartPopup from '../../pages/home/features/CartPopup'
import '../styles/navBar.scss'
import logo from '../../assets/icons/logo1.png'
import cart_icon from '../../assets/icons/cart.png'
import profile from '../../assets/icons/profile.png'
import { useState, useEffect } from 'react'
import { ROUTES } from '../../app/appConfig'
import { getClassNames } from '../utils/global'
import ProfilePopup from '../../pages/home/features/ProfilePopup'
import SearchBar from './SearchBar'

function NavBar() {
  const navLinks = [
    {
      text: 'Home',
      url: `${ROUTES.HOME}`,
    },
    {
      text: 'Categories',
      url: `${ROUTES.CATEGORIES}`
    }
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)




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
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const openProfile = () => {
    setIsProfileOpen(true);
    setIsMenuOpen(false);
    setIsCartOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="company-title">
          <button
            className={`menu-btn ${getClassNames(isMenuOpen, "open", "", "")}`}
            onClick={openMenu}

            aria-label="toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <img src={logo} alt="Logo" className="company-logo" />
          <h4 >Dummy Donkies</h4>
        </div>

        {!isMenuOpen && <div className="nav-links">
          {navLinks.map((i, idx) => (
            <NavButton key={idx} text={i.text} url={i.url} />
          ))}
          <ThemeButton className="theme-switch" />
        </div>}
        <div className="search-wrapper">
          <SearchBar onSearch={(q) => console.log("Search:", q)} />
        </div>

        <div className="logos">
          <img
            src={cart_icon}
            alt="cart"
            className="company-logo"
            onClick={openCart}

          />

          <img
            src={profile}
            alt="profile"
            className="company-logo"
            onClick={openProfile}

          />
        </div>
      </nav>

      <div
        className={`overlay ${getClassNames(isMenuOpen || isCartOpen || isProfileOpen, "show", "")}`}
        onClick={closeAll}

      />
      <aside className={`sidebar ${getClassNames(isMenuOpen, "open", "")}`}>
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
      {isCartOpen && <CartPopup
        isOpen={isCartOpen}
        onClose={closeAll}


      />}
      {isProfileOpen && (
        <ProfilePopup
          isOpen={isProfileOpen}
          onClose={closeAll}

        />
      )}

    </>
  )
}

export default NavBar