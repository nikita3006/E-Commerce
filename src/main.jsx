import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Store/AuthProvider.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductProvider } from "./Store/ProductContext.jsx";
import CartProvider from "./Store/CartProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <CartProvider>
    <AuthProvider>
      <ProductProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductProvider>
    </AuthProvider>
    </CartProvider>
  </BrowserRouter>
);
