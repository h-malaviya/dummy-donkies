import { useState } from 'react'
import '../styles/global.scss'
import Login from '../features/login/pages/Login'
import Signup from '../features/signup/pages/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
