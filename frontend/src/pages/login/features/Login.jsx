import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/appConfig";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
export default function Login() {
  const navigateTo = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: "",
    password: "",
    role: "user",
  };

  const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Please select a role"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError }
  ) => {
    try {
      console.log(values);
      
      const res = await login(values.username, values.password);

      if (!res.success) {
        setFieldError("error", "Invalid username or password");
        return;
      }
      localStorage.setItem("userRole", values.role);
      navigateTo(ROUTES.HOME);
    } catch (err) {
      setFieldError("error", "Server error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>
          Welcome to <span>Dummy Donkies</span>
        </h3>
        <p>Login to continue</p>

        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              {/* Username */}
              <Input
                id="username"
                name="username"
                type="text"
                label="Username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="input-error">
                  {formik.errors.username}
                </div>
              )}

              {/* Password */}
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="show-password-container">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Password
                </label>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="input-error">
                  {formik.errors.password}
                </div>
              )}
             <div className="role-selection">
                <label className="role-label">Login as:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formik.values.role === "user"}
                      onChange={formik.handleChange}
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formik.values.role === "admin"}
                      onChange={formik.handleChange}
                    />
                    Admin
                  </label>
                </div>
                <div className="input-error">
                  {formik.errors.error}
                </div>
              </div>

              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          )}
        </Formik>

        <p className="switch">
          Don’t have an account?{" "}
          <span onClick={() => navigateTo(ROUTES.SIGNUP)}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
