export const ROUTES = Object.freeze({
  ROOT: "/",
  LOGIN: "/",
  SIGNUP: "/signup",
  HOME: "/home",
  CATEGORIES: "/categories",
  PROFILE: "/profile",
  CART: "/cart",
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_USERS_REL: "users",
  ADMIN_PRODUCTS_REL: "products",
});
export const BACKEND_ENDPOINTS = Object.freeze({
  LOGIN: "/auth/login",
  PRODUCTS: "/products",
  PRODUCT: "/products/",
  USERS: "/users",
  USER: "/users/",
  CARTS: "/carts",
  CART: "/carts/",
});

export const isAdmin=false