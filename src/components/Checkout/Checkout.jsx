import "./Checkout.css";

import React, { useState } from "react";

import QRCode from "react-qr-code";
import axios from "axios"; // For making API requests to your backend
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Q8xL0AOza39iLxIcMsAL24Onny4PsAmKzG8IzOljeW2F4f0USQScTrSCaWi10oPcmkeuZ6wA9AbDLlw6IzwVmAq00MCv50p2k"
); // Add your Stripe publishable key

const Checkout = ({ selectedTables, totalCount, totalPrice, onConfirm }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // Call your backend to create a payment session
      const { data } = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
          amount: totalPrice * 100, // Stripe requires amount in the smallest currency unit (like cents)
        }
      );

      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.id, // Use the sessionId from the backend response
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const qrCodeValue = `Total Seats: ${totalCount}, Total Price: ${totalPrice} INR`;

  return (
    <div className="checkout bg-gray-50 p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Checkout
      </h2>

      <div className="border-b pb-4 mb-4">
        <p className="text-lg font-semibold text-gray-700">
          Total seats selected:{" "}
          <span className="font-bold text-green-600">{totalCount}</span>
        </p>
        <p className="text-lg font-semibold text-gray-700">
          Total price:{" "}
          <span className="font-bold text-green-600">{totalPrice} INR</span>
        </p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">Selected Seats:</h3>
      <ul className="list-disc list-inside mb-4">
        {selectedTables.map((seats, index) =>
          seats > 0 ? (
            <li key={index} className="text-gray-600">
              <span className="font-medium">Table {index + 1}:</span> {seats}{" "}
              seat(s)
            </li>
          ) : null
        )}
      </ul>

      <div className="my-6 flex justify-center">
        <QRCode value={qrCodeValue} size={128} />
      </div>

      <button
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-200"
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>

      <button
        className="w-full text-gray-600 font-semibold py-2 mt-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default Checkout;
