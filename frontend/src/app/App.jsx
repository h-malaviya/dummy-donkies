import { useState } from 'react'
import '../styles/global.scss'
import Login from '../pages/login/features/Login'
import Signup from '../pages/signup/features/Signup'
import Home from '../pages/home/features/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import { ROUTES } from './appConfig'
function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
