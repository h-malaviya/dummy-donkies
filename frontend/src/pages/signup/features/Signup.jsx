import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { ROUTES } from "../../../app/appConfig";
import useUsers from "../../../hooks/useUser";
import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";
import "../../login/features/login.scss";

export default function Signup() {
  const navigateTo = useNavigate();
  const { signup } = useUsers();
  const [showPassword, setShowPassword] = useState(false);

  // 1. Corrected Initial Values
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confPass: ''
  };

  const signupValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confPass: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords must match") // Check equality
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      console.log(values);
      
      const res = await signup({username:values.username,email: values.email,password: values.password});
      console.log(res);
      
      if (!res.success) {
        setFieldError('error', res.message || 'Something went wrong during signup');
        return;
      }
      
      navigateTo(ROUTES.LOGIN);
    } catch (error) {
      setFieldError("error", "Server error. Please try again later!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome to <span>Dummy Donkies</span></h2>
        <p>Create Account</p>

        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              {/* Username Field */}
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
                <div className="input-error">{formik.errors.username}</div>
              )}

              {/* Email Field */}
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="input-error">{formik.errors.email}</div>
              )}

              {/* Password Field */}
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
              {formik.touched.password && formik.errors.password && (
                <div className="input-error">{formik.errors.password}</div>
              )}

              {/* Confirm Password Field */}
              <Input
                id="confPass"
                name="confPass"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                placeholder="Confirm password"
                value={formik.values.confPass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confPass && formik.errors.confPass && (
                <div className="input-error">{formik.errors.confPass}</div>
              )}

              {/* Show Password Toggler */}
              <div className="show-password-container">
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  Show Passwords
                </label>
              </div>

              {/* General Form Error Display */}
              {formik.errors.error && (
                <div className="input-error general-error">
                  {formik.errors.error}
                </div>
              )}

              <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Signing up..." : "Signup"}
              </Button>
            </Form>
          )}
        </Formik>
       
        <p className="switch">
          Already have an account? <span onClick={() => navigateTo(ROUTES.LOGIN)}>Login</span>
        </p>
      </div>
    </div>
  );
}