import { useState,useEffect } from "react";
import "./styles/profilePopup.scss";

export default function ProfilePopup({ isOpen, onClose, user, onUpdate }) {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
        username: user.username,
        password: user.password
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    onUpdate(form);
    setIsEdit(false);
  };

  return (
    <>

      <div className="profile-modal">
        <header className="header">
          <h3>Profile</h3>
          <button onClick={onClose}>✕</button>
        </header>

        <div className="content">
          <div className="row">
            <label>Name</label>
            <input
              value={`${user.name.firstname} ${user.name.lastname}`}
              disabled
            />
          </div>

          <div className="row">
            <label>Phone</label>
            <input value={user.phone} disabled />
          </div>

          <div className="row">
            <label>Address</label>
            <textarea
              value={`${user.address.number}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
              disabled
            />
          </div>
          <div className="row editable">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>

          <div className="row editable">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>

          <div className="row editable">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={!isEdit}
            />
          </div>
        </div>

        <footer className="footer">
          {!isEdit ? (
            <button className="edit" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          ) : (
            <>
              <button className="save" onClick={handleSave}>
                Save
              </button>
              <button className="cancel" onClick={() => setIsEdit(false)}>
                Cancel
              </button>
            </>
          )}
        </footer>
      </div>
    </>
  );
}