// src/components/Seat/Seat.jsx

import React, { useState } from "react";

export const Seat = ({ selectedSeats, onSelect, tableIndex }) => {
  const [seats, setSeats] = useState(selectedSeats);

  const handleIncrement = () => {
    if (seats < 2) {
      const newSeats = seats + 1;
      setSeats(newSeats);
      onSelect(tableIndex, newSeats);
    }
  };

  const handleDecrement = () => {
    if (seats > 0) {
      const newSeats = seats - 1;
      setSeats(newSeats);
      onSelect(tableIndex, newSeats);
    }
  };

  return (
    <div
      className={`relative w-20 h-32 gap-5 flex flex-col items-center justify-between cursor-pointer ${
        seats > 0 ? "bg-blue-400" : "bg-gray-300"
      } rounded-md p-2 transition-colors duration-300`}
    >
      {/* Table */}
      <div
        className={`w-full h-3/5 bg-brown-800 rounded-md mx-auto transition-colors duration-300 ${
          seats > 0 ? "bg-blue-400" : "bg-brown-800"
        }`}
      ></div>

      {/* Chairs */}
      <div
        className={`absolute w-5 h-5 bg-orange-500 rounded-full top-5 left-[-10%] transition-colors duration-300 ${
          seats > 0 ? "bg-red-500" : "bg-orange-500"
        }`}
      ></div>
      <div
        className={`absolute w-5 h-5 bg-orange-500 rounded-full top-5 right-[-10%] transition-colors duration-300 ${
          seats > 0 ? "bg-red-500" : "bg-orange-500"
        }`}
      ></div>

      {/* Seat Controls */}
      <div className="flex justify-center items-center mt-2">
        <button
          className="mx-1 px-2 py-1 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="text-lg">{seats}</span>
        <button
          className="mx-1 px-2 py-1 bg-green-500 text-white rounded transition duration-200 hover:bg-green-600"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    </div>
  );
};
