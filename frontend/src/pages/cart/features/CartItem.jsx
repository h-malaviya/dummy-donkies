import "./styles/cartItem.scss";
import trash_icon from '../../../assets/icons/trash.png'
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />

      <div className="info">
        <h4>{item.title}</h4>
        <p>${item.price.toFixed(2)}</p>

        <div className="qty-controls">
          <button onClick={() => onDecrease(item.id)}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)}>+</button>
        </div>
      </div>

      <div className="subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
        <img src={trash_icon} alt="remove-item-icon" className="remove" onClick={()=>onRemove(item.id)}/>
    </div>
  );
}
