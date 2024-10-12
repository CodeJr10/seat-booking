// src/App.jsx
import "./index.css"; // Ensure Tailwind CSS is imported

import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import CheckoutPage from "./pages/CheckoutPage.jsx";
import { Seat } from "./components/Seat/Seat.jsx";

const BASE_PRICE = 200; // Base price for a single seat

function App() {
  const numberOfTables = 12; // 4 rows x 3 columns
  const [selectedTables, setSelectedTables] = useState(
    Array(numberOfTables).fill(0)
  );
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  // Load selected tables from local storage
  useEffect(() => {
    const savedTables =
      JSON.parse(localStorage.getItem("selectedTables")) ||
      Array(numberOfTables).fill(0);
    setSelectedTables(savedTables);
  }, []);

  // Update total count of selected seats and total price
  useEffect(() => {
    const count = selectedTables.reduce((acc, curr) => acc + curr, 0);
    setTotalCount(count);
    setTotalPrice(count * BASE_PRICE); // Calculate total price
    localStorage.setItem("selectedTables", JSON.stringify(selectedTables));
  }, [selectedTables]);

  // Update seat selection for a table
  const updateSeatSelection = (index, seats) => {
    const updatedTables = [...selectedTables];
    updatedTables[index] = seats;
    setSelectedTables(updatedTables); // Corrected typo here
  };

  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    // Calculate total cost
    const totalCost = selectedTables.reduce(
      (acc, seats) => acc + seats * BASE_PRICE,
      0
    );
    // Navigate to checkout page
    navigate("/checkout", {
      state: {
        totalCount,
        totalPrice: totalCost,
        selectedTables,
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <h3 className="text-center text-black text-2xl font-bold my-4">
        Choose your seats
      </h3>

      {/* Centered 4x3 Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-4xl justify-items-center">
        {/* Render Seat components as tables */}
        {selectedTables.map((seats, index) => (
          <Seat
            key={index}
            selectedSeats={seats}
            tableIndex={index}
            onSelect={updateSeatSelection}
          />
        ))}
      </div>

      {/* Total Seats and Price */}
      <div className="text-center mt-4 text-black">
        <p className="text-lg">
          You have selected a total of <span id="count">{totalCount}</span> seat
          {totalCount !== 1 ? "s" : ""}.
        </p>
        <p className="text-lg text-black">
          Total price: <span id="total">{totalPrice} </span> INR
        </p>
      </div>

      {/* Proceed to Checkout Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleProceedToCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Define Routes */}
      <Routes>
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}
export default App;
