import CartItem from "./CartItem";
import "./styles/cartPopup.scss";
export const cartItems = [
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

export default function CartPopup({ isOpen, onClose, cart, products ,onDecrease,onIncrease,onRemove}) {
  if (!isOpen) return null;

  const cartItems = cart.products.map((item) => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
        <footer className="cart-footer">
          <div className="total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button className="checkout-btn">
            Checkout
          </button>
        </footer>
      </aside>
    </>
  );
}
