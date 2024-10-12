import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import App from "./App";
import CheckoutPage from "./pages/CheckoutPage"; // Import your CheckoutPage component
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
