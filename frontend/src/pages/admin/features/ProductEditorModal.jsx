import { useState } from "react";
import './styles/productEditorModal.scss'
export default function ProductEditorModal({ product, onSave, onClose ,onAdd}) {
  const [form, setForm] = useState(product);
  const isAdd = !product.id

  return (
    <div className="admin-edit-modal">
      <div className="modal">
        <div className="header">
          <h3>{!isAdd ? "Edit Product" : "Add Product"}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="body">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            value={form.price}
            onChange={e =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
          {isAdd && <><label htmlFor="category">Category</label>
            <input type="text" name="form.category" id="category" onChange={e =>
              setForm({ ...form, category: e.target.value })
            } />
            <label htmlFor="description">Description</label>
            <input type="text" name="form.category" id="description" onChange={e =>
              setForm({ ...form, description: e.target.value})
            } /></>}
        </div>

        {!isAdd ? <div className="footer">
          <button className="save" onClick={() => onSave(form)}>
            Save
          </button>
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div> :
          <div className="footer">
            <button className="save" onClick={() => onAdd(form)}>
              Add product
            </button>
          </div>
        }
      </div>
    </div>
  );
}