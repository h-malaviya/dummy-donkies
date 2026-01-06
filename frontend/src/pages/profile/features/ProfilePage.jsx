import { useState, useEffect } from "react";
import "./styles/profilePage.scss";
import NavBar from "../../../shared/components/NavBar";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/appConfig";
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

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(userData);
    const [isEdit, setIsEdit] = useState(false);

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        setForm({
            email: user.email,
            username: user.username,
            password: user.password
        });
    }, [user]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const saveProfile = () => {
        setUser(prev => ({ ...prev, ...form }));
        setIsEdit(false);
    };

    const handleLogout = () => {
        const ok = window.confirm(
            `Are you sure you want to delete ${u.username}? This action cannot be undone.`
        );

        if (ok) {
            deleteUser(u.id);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();

        navigate(ROUTES.LOGIN, { replace: true });
    };
    return (
        <>
            <section className="profile-page">
                <NavBar />
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>Profile</h1>

                        <div className="actions">
                            {!isEdit ? (
                                <button className="edit" onClick={() => setIsEdit(true)}>
                                    Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button className="save" onClick={saveProfile}>Save</button>
                                    <button className="cancel" onClick={() => setIsEdit(false)}>
                                        Cancel
                                    </button>
                                </>
                            )}
                            <button className="logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="profile-grid">
                        {/* LEFT — READ ONLY */}
                        <div className="card">
                            <h3>Basic Info</h3>

                            <div className="field">
                                <label>Name</label>
                                <p>{user.name.firstname} {user.name.lastname}</p>
                            </div>

                            <div className="field">
                                <label>Phone</label>
                                <p>{user.phone}</p>
                            </div>

                            <div className="field">
                                <label>Address</label>
                                <p>
                                    {user.address.number}, {user.address.street},<br />
                                    {user.address.city} - {user.address.zipcode}
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <h3>Account Details</h3>

                            <div className="field editable">
                                <label>Email</label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                />
                            </div>

                            <div className="field editable">
                                <label>Username</label>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    disabled={!isEdit}
                                />
                            </div>
                            <div className="field editable">
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
                    </div>
                </div>
            </section>
        </>
    );
}