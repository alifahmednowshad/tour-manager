// src/components/UserList.js

import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchData("Users"); // Ensure correct table name casing
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Users List</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.USER_ID || user.user_id}>
                <td>{user.USER_ID || user.user_id}</td>
                <td>{user.NAME || user.name}</td>
                <td>{user.EMAIL || user.email}</td>
                <td>{user.PHONE || user.phone}</td>
                <td>{user.ROLE || user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
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

export default UserList;
