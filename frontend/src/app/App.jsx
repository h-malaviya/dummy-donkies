import '../styles/global.scss'
import Login from '../pages/login/features/Login'
import Signup from '../pages/signup/features/Signup'
import Home from '../pages/home/features/Home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './ThemeContext'
import { ROUTES } from './appConfig'
import ProtectedRoute from './ProtectedRoute'
import AdminLayout from '../pages/admin/features/AdminLayout'
import AdminProducts from '../pages/admin/features/AdminProducts'
import AdminUsers from '../pages/admin/features/AdminUsers'
import CartPage from '../pages/cart/features/CartPage'
import ProfilePage from '../pages/profile/features/ProfilePage'
function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}> 
            <Route path={ROUTES.CART} element={<CartPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
              <Route index element={<Navigate to={ROUTES.ADMIN_USERS_REL} replace />} />
              <Route path={ROUTES.ADMIN_USERS_REL} element={<AdminUsers />} />
              <Route path={ROUTES.ADMIN_PRODUCTS_REL} element={<AdminProducts />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
