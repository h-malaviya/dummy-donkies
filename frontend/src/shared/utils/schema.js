import * as Yup from 'yup';

export const signupValidationSchema = Yup.object({
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

export const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Please select a role"),
});