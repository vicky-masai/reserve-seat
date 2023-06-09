import React, { useState } from "react";

function SeatBooking() {
  const totalSeats = 80;
  const seatsInRow = 7;
  const lastRowSeats = 3;

  const [seats, setSeats] = useState(new Array(totalSeats).fill(false));
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatCount, setSeatCount] = useState();
  const [Alert, setAlert] = useState("");

  const handleSeatBooking = () => {
    let bookedSeats = []; // Store the seat numbers that were booked

    for (let i = 0; i <= totalSeats - seatCount; i++) {
      // Adjust the seats per row for the last row
      let seatsPerRow = i < totalSeats - lastRowSeats ? seatsInRow : lastRowSeats;

      // Check if there are enough contiguous available seats in this row
      if (
        (i % seatsPerRow) + parseInt(seatCount) <= seatsPerRow &&
        seats.slice(i, i + parseInt(seatCount)).every((x) => x === false)
      ) {
        // If so, book them
        const newSeats = [...seats];
        for (let j = 0; j < seatCount; j++) {
          newSeats[i + j] = true; // mark seat as booked
          bookedSeats.push(generateSeatNumber(i + j)); // store the seat number
        }
        setSeats(newSeats);
        break; // exit the loop once we've booked the seats
      }
    }

    if (bookedSeats.length > 0) {
      setBookedSeats(bookedSeats);
    } else {
        setAlert("Max 7 seats can be booked at a time");
        setTimeout(() => {
          setAlert("");
        }, 3000);
    }
  };

  const generateSeatNumber = (seatIndex) => {
    let rowLetter = String.fromCharCode("a".charCodeAt(0) + Math.floor(seatIndex / seatsInRow));
    let seatNumber = (seatIndex % seatsInRow) + 1;
    if (seatIndex >= totalSeats - lastRowSeats) {
      rowLetter = "z";
      seatNumber = seatIndex - (totalSeats - lastRowSeats) + 1;
    }
    return rowLetter + seatNumber;
  };

  const handleChange = (event) => {
    setSeatCount(event.target.value);
  };

  return (
    <div style={{ textAlign: "center",width:"80%",height:"100%",margin:"0px auto",boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",backgroundColor:"white",padding:"20px"}}>
      <h1 style={{fontSize:"25px",margin:"20px"}}>Seat Booking System</h1>
      <p>Enter the number of seats you want to book:</p>
      <input
        type="number"
        value={seatCount}
        onChange={handleChange}
        placeholder="No of seats you want to book. eg. 1"
        style={{ margin: "5px auto",width:"40%",height:"30px",border:"1px solid gray",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",paddingLeft:"10px"}}
      />
      <button
        onClick={handleSeatBooking}
        style={{
          padding: "7px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
            borderTopRightRadius:"20px",
            borderBottomRightRadius:"20px",
          cursor: "pointer",
        }}
      >
        Book
      </button><br /><br />
      <h3 style={{ color: "red",fontWeight:"400"}}>{Alert}</h3>
      <br /><br /><hr />
      {bookedSeats.length > 0 && (
        <div style={{ marginTop: "10px",display:"flex",alignItems:"center"}}><strong>Booked Seat no.</strong><p style={{padding:"3px 10px",backgroundColor:"black",color:"white",borderRadius:"20px",}}>{" "}{bookedSeats.join(", ")}</p></div>
      )}
      <br />
<hr />
      <div style={{ marginTop: "20px",display:'grid',gridTemplateColumns:"repeat(7,1fr)" }}>
        {seats.map((isBooked, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              backgroundColor: isBooked ? "red" : "green",
              padding: "5px",
              margin: "5px",
              color: "white",
              borderRadius: "3px",
            }}
          >
        {generateSeatNumber(index)}
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default SeatBooking;
