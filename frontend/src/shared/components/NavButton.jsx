import React from 'react'
import '../styles/navButton.scss'
import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../app/appConfig'
function NavButton({ text = "Home", url = ROUTES.HOME}) {

  return (
    <>
      <NavLink to={url} className="nav-item">{text}</NavLink>
    </>
  )
}

export default NavButton