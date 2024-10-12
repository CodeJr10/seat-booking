// src/pages/CheckoutPage.jsx

import Checkout from "../components/Checkout/Checkout"; // Adjust the path if needed
import React from "react";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { totalCount, totalPrice, selectedTables } = location.state || {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Checkout
        selectedTables={selectedTables}
        totalCount={totalCount}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default CheckoutPage;
