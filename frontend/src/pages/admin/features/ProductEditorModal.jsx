import { useState } from "react";
import './styles/productEditorModal.scss'
export default function ProductEditorModal({ product, onSave, onClose }) {
  const [form, setForm] = useState(product);

  return (
    <div className="admin-edit-modal">
      <div className="modal">
        <div className="header">
          <h3>Edit Product</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="body">
          <label>Title</label>
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <label>Price</label>
          <input
            type="number"
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

        </div>

        <div className="footer">
          <button className="save" onClick={() => onSave(form)}>
            Save
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}