import "./BookingPage.css"; // Optional styles for the Booking page

import React, { useState } from "react";

import Checkout from "../components/Checkout/Checkout";
import SeatMap from "../components/SeatMap/SeatMap";
import { seatingData } from "../data/seatingData";

const BookingPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const ticketPrice = 10; // Example ticket price per seat

  const handleSeatSelection = (seat) => {
    const isSelected = selectedSeats.includes(seat);
    const updatedSeats = isSelected
      ? selectedSeats.filter((s) => s !== seat) // Deselect
      : [...selectedSeats, seat]; // Select

    setSelectedSeats(updatedSeats);
    setTotalCost(updatedSeats.length * ticketPrice); // Update total cost
  };

  return (
    <div>
      <h1>Book Your Seats</h1>
      <SeatMap seats={seatingData} onSeatSelection={handleSeatSelection} />
      <Checkout selectedSeats={selectedSeats} totalCost={totalCost} />
    </div>
  );
};

export default BookingPage;
