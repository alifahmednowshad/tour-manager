// src/components/BookingList.js

import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await fetchData("Bookings"); // Ensure correct table name casing
        setBookings(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    getBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Bookings List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Destination ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.BOOKING_ID || booking.booking_id}>
                <td>{booking.BOOKING_ID || booking.booking_id}</td>
                <td>{booking.USER_ID || booking.user_id}</td>
                <td>{booking.DESTINATION_ID || booking.destination_id}</td>
                <td>{booking.START_DATE || booking.start_date}</td>
                <td>{booking.END_DATE || booking.end_date}</td>
                <td>{booking.TOTAL_AMOUNT || booking.total_amount}</td>
                <td>{booking.STATUS || booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default BookingList;
