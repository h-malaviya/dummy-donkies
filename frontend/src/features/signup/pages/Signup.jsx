import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import "../../login/pages/login.scss";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const navigateTo = useNavigate()
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>
          Welcome to <span>Dummy Donkies</span>
        </h2>
        <p>Create Account</p>

        <Input type="text" label="Full Name" />
        <Input type="email" label="Email" />
        <Input type="password" label="Password" />

        <Button>Sign Up</Button>

        <p className="switch">
          Already have an account? <span onClick={()=>navigateTo('/')}>Login</span>
        </p>
      </div>
    </div>
  );
}
