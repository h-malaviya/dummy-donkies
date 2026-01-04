import React from 'react'
import ThemeButton from './ThemeButton'
import NavButton from './NavButton'
import CartPopup, { cartItems } from '../../pages/home/features/CartPopup'
import '../styles/navBar.scss'
import logo from '../../assets/icons/logo1.png'
import cart_icon from '../../assets/icons/cart.png'
import profile from '../../assets/icons/profile.png'
import { useState,useEffect } from 'react'
import { ROUTES } from '../../app/appConfig'
import { getClassNames } from '../utils/global'
const cartData = {
  id: 101,
  userId: 1,
  date: "2025-01-10T00:00:00.000Z",
  products: [
    {
      productId: 1,
      quantity: 2
    },
    {
      productId: 2,
      quantity: 1
    },
    {
      productId: 3,
      quantity: 1
    },
    {
      productId: 5,
      quantity: 1
    }
  ]
};
export const products = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, breathable and comfortable fabric.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "Color may vary slightly. Please review size details carefully.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    rating: { rate: 2.1, count: 430 }
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "Inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    rating: { rate: 4.6, count: 400 }
  }
];


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
  const [cart, setCart] = useState(cartData);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeAll();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  const increaseQty = (productId) => {
    setCart(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.productId === productId
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    }));
  };
  const decreaseQty = (productId) => {
    setCart(prev => ({
      ...prev,
      products: prev.products
        .map(p =>
          p.productId === productId
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    }));
  };
  const removeItem = (productId) => {
    setCart(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
  };

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
            className={`menu-btn ${getClassNames(isMenuOpen,"open","","")}`}
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
            onClick={openCart}
          />

          <img
            src={profile}
            alt="profile"
            className="company-logo"
            onClick={openProfile}
          />
        </div>

        <ThemeButton />
      </nav>

      <div
        className={`overlay ${getClassNames(isMenuOpen || isCartOpen || isProfileOpen , "show" , "")}`}
        onClick={closeAll}
      />
      <aside className={`sidebar ${getClassNames(isMenuOpen, "open" , "")}`}>
        <button className="close-btn" onClick={closeAll}>
          ✕
        </button>

        <div className="sidebar-links">
          {navLinks.map((i, idx) => (
            <NavButton
              key={idx}
              text={i.text}
              url={i.url}
              onClick={closeAll}
            />
          ))}
        </div>
      </aside>
      {isCartOpen && <CartPopup
        isOpen={isCartOpen}
        onClose={closeAll}
        cart={cart}
        products={products}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />}
    </>
  )
}

export default NavBar