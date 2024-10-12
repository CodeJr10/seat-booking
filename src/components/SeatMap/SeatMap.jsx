import "./SeatMap.css";

import React from "react";
import Seat from "../Seat/Seat";

const SeatMap = ({ seats, onSeatSelection }) => {
  return (
    <div className="seat-map">
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat, seatIndex) => (
            <Seat
              key={seatIndex}
              seat={seat}
              onSeatSelection={onSeatSelection}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
