import { useState, useMemo } from "react";
import CartItem from "./CartItem";
import "./styles/cartPage.scss";
import NavBar from "../../../shared/components/NavBar";

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

export default function CartPage() {
  const [cart, setCart] = useState(cartData);

  const cartItems = useMemo(() => {
    return cart.products.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...product, quantity: item.quantity };
    });
  }, [cart]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 200 ? 0 : 12;
  const total = subtotal + tax + shipping;

  /* ===== CART ACTIONS ===== */

  const onIncrease = (id) => {
    setCart(prev => ({
      ...prev,
      products: prev.products.map(p =>
        p.productId === id
          ? { ...p, quantity: Math.min(p.quantity + 1, 10) }
          : p
      )
    }));
  };

  const onDecrease = (id) => {
    setCart(prev => ({
      ...prev,
      products: prev.products
        .map(p =>
          p.productId === id
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    }));
  };

  const onRemove = (id) => {
    setCart(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== id)
    }));
  };

  if (!cartItems.length) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to continue</p>
      </div>
    );
  }

  return (
    <>
    <NavBar/>
    <section className="cart-page">
      {/* LEFT */}
      <div className="cart-items-section">
        <h2>Your Cart</h2>

        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <aside className="order-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
        </div>

        <div className="summary-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </aside>
    </section>
    </>
  );
}

