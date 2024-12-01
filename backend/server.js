require("dotenv").config();
const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// OracleDB connection helper function
async function executeQuery(query, params = []) {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });

    // Using OUT_FORMAT_OBJECT to get plain JavaScript objects
    const result = await connection.execute(query, params, {
      outFormat: oracledb.OUT_FORMAT_OBJECT, // Force the query result to be a plain object
      autoCommit: true,
    });

    // Close the connection
    await connection.close();

    // Return only the rows (data) from the result set
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}

// 1. GET: Fetch all data from any table
app.get("/api/:table", async (req, res) => {
  const { table } = req.params;
  try {
    const result = await executeQuery(`SELECT * FROM ${table}`);
    res.json(result); // Send the rows as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 2. POST: Insert data into any table
app.post("/api/:table", async (req, res) => {
  const { table } = req.params;
  const data = req.body;

  try {
    const keys = Object.keys(data).join(", ");
    const values = Object.keys(data)
      .map((_, idx) => `:${idx + 1}`)
      .join(", ");
    const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;

    await executeQuery(query, Object.values(data));
    res.json({ message: `Data inserted into ${table}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 3. PUT: Update data in any table
app.put("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const data = req.body;

  try {
    const updates = Object.keys(data)
      .map((key, idx) => `${key} = :${idx + 1}`)
      .join(", ");
    const query = `UPDATE ${table} SET ${updates} WHERE id = :${
      Object.keys(data).length + 1
    }`;

    await executeQuery(query, [...Object.values(data), id]);
    res.json({ message: `Data updated in ${table}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 4. DELETE: Remove data from any table
app.delete("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;

  try {
    const query = `DELETE FROM ${table} WHERE id = :1`;
    await executeQuery(query, [id]);
    res.json({ message: `Data deleted from ${table}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 5. Specific Routes for Tables

// Users - Insert a new user
app.post("/api/users", async (req, res) => {
  const { name, email, phone, role, password } = req.body;
  try {
    const query = `INSERT INTO Users (name, email, phone, role, password)
                   VALUES (:1, :2, :3, :4, :5)`;
    await executeQuery(query, [name, email, phone, role, password]);
    res.json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Destinations - Insert a new destination
app.post("/api/destinations", async (req, res) => {
  const { name, location, description, price_per_day } = req.body;
  try {
    const query = `INSERT INTO Destinations (name, location, description, price_per_day)
                   VALUES (:1, :2, :3, :4)`;
    await executeQuery(query, [name, location, description, price_per_day]);
    res.json({ message: "Destination added successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Bookings - Create a new booking
app.post("/api/bookings", async (req, res) => {
  const {
    user_id,
    destination_id,
    start_date,
    end_date,
    total_amount,
    status,
  } = req.body;
  try {
    const query = `INSERT INTO Bookings (user_id, destination_id, start_date, end_date, total_amount, status)
                   VALUES (:1, :2, :3, :4, :5, :6)`;
    await executeQuery(query, [
      user_id,
      destination_id,
      start_date,
      end_date,
      total_amount,
      status,
    ]);
    res.json({ message: "Booking created successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Payments - Create a new payment
app.post("/api/payments", async (req, res) => {
  const { booking_id, amount, payment_date, payment_method, status } = req.body;
  try {
    const query = `INSERT INTO Payments (booking_id, amount, payment_date, payment_method, status)
                   VALUES (:1, :2, :3, :4, :5)`;
    await executeQuery(query, [
      booking_id,
      amount,
      payment_date,
      payment_method,
      status,
    ]);
    res.json({ message: "Payment added successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Reviews - Create a new review
app.post("/api/reviews", async (req, res) => {
  const { user_id, destination_id, rating, comments } = req.body;
  try {
    const query = `INSERT INTO Reviews (user_id, destination_id, rating, comments)
                   VALUES (:1, :2, :3, :4)`;
    await executeQuery(query, [user_id, destination_id, rating, comments]);
    res.json({ message: "Review added successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
