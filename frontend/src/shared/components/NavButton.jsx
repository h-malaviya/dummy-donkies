import React from 'react'
import '../styles/navButton.scss'
import { NavLink } from 'react-router-dom'

function NavButton({ text = "Home", url = "/" }) {

  return (
    <>
      <NavLink to={url} className="nav-item">{text}</NavLink>
    </>
  )
}

export default NavButton