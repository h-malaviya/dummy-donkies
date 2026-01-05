import CartItem from "./CartItem";
import { useState } from "react";
import "./styles/cartPopup.scss";
const cartItems = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    quantity: 2
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    quantity: 1
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    quantity: 1
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Bracelet",
    price: 695,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
    quantity: 1
  }
];
const products = [
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

export default function CartPopup({ isOpen, onClose}) {
  if (!isOpen) return null;
  const [cart, setCart] = useState(cartData);
  const cartItems = cart.products.map((item) => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const onIncrease = (productId) => {
  setCart(prev => ({
    ...prev,
    products: prev.products.map(p =>
      p.productId === productId
        ? { ...p, quantity: Math.min(p.quantity + 1, 10) } 
        : p
    )
  }));
};
  const onDecrease = (productId) => {
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
  const onRemove = (productId) => {
    setCart(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
  };
  return (
    <>
      <div className="cart-overlay" onClick={onClose} />

      <aside className="cart-popup open">
        <header className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={onClose}>✕</button>
        </header>

        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
        <div className="cart-footer">
          <div className="total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="checkout-btn">
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
