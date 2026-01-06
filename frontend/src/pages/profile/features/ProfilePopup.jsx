import { useState, useEffect } from "react";
import "./styles/profilePopup.scss";
import { isAdmin } from "../../../app/appConfig";
const userData = {
  "address": {
    "geolocation": {
      "lat": "-37.3159",
      "long": "81.1496"
    },
    "city": "kilcoole",
    "street": "new road",
    "number": 7682,
    "zipcode": "12926-3874"
  },
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "password": "m38rmF$",
  "name": {
    "firstname": "john",
    "lastname": "doe"
  },
  "phone": "1-570-236-7033",
  "__v": 0
}

export default function ProfilePopup({ isOpen, onClose ,isProfileEdit}) {
  const [user, setUser] = useState(userData);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: ""
  });
  const onUpdate = (updated) => {
    setUser(prev => ({ ...prev, ...updated }));
  };
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

  };

  return (
    <>
      <div className="profile-modal">
        <header className="header">
          <h3>{isAdmin && "Edit "}Profile</h3>
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
            />
          </div>

          <div className="row editable">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          {!isAdmin  || isProfileEdit &&
            <div className="row editable">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

          }
        </div>

        <div className="footer">
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}