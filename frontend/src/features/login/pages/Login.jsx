import { useState } from "react";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import "./login.scss";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const [role, setRole] = useState("user");
    const navigateTo = useNavigate()
    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>
                    Welcome to <span>Dummy Donkies</span>
                </h2>
                <p>Login to continue</p>
                
                    <Input type="email" label="Email" />
                    <Input type="password" label="Password" />
                

                <div className="role-select">
                    <label>
                        <input
                            type="radio"
                            checked={role === "user"}
                            onChange={() => setRole("user")}
                        />
                        User
                    </label>
                    <label>
                        <input
                            type="radio"
                            checked={role === "admin"}
                            onChange={() => setRole("admin")}
                        />
                        Admin
                    </label>
                </div>

                <Button onclick={()=>navigateTo('/home')}>Login</Button>

                <p className="switch">
                    Don’t have an account? <span onClick={()=>navigateTo('/signup')}>Sign up</span>
                </p>
            </div>
        </div>
    );
}
