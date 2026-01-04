import React from 'react'
import ThemeButton from './ThemeButton'
import NavButton from './NavButton'
import '../styles/navBar.scss'
import logo from '../../assets/icons/logo1.png'
import cart_icon from '../../assets/icons/cart.png'
import profile from '../../assets/icons/profile.png'
import { useState } from 'react'
import { ROUTES } from '../../app/appConfig'

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
  return (
    <>
      <nav className="navbar">
        <div className="company-title">
          <button
            className={`menu-btn ${isMenuOpen ? "open" : ""}`}
            onClick={()=>setIsMenuOpen(true)}
            aria-label="toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          <img src={logo} alt="Logo" className="company-logo" />
          <h4 >Dummy Donkies</h4>
        </div>

        <div className="nav-links">
          {navLinks.map((i, idx) => (
            <NavButton key={idx} text={i.text} url={i.url} />
          ))}
        </div>

        <div className="logos">
          <img
            src={cart_icon}
            alt="cart"
            className="company-logo"
            
          />

          <img
            src={profile}
            alt="profile"
            className="company-logo"
          
          />
        </div>

        <ThemeButton />
      </nav>

      <div
        className={`overlay ${isMenuOpen ? "show" : ""
          }`}
        onClick={()=>setIsMenuOpen(true)}
      />
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={()=>setIsMenuOpen(false)}>
          ✕
        </button>

        <div className="sidebar-links">
          {navLinks.map((i, idx) => (
            <NavButton
              key={idx}
              text={i.text}
              url={i.url}
              onClick={()=>setIsMenuOpen(false)}
            />
          ))}
        </div>
      </aside>
      
    </>
  )
}

export default NavBar