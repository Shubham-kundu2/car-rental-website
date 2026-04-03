const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = Number(process.env.PORT) || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Shub2002@",
  database: process.env.DB_NAME || "car_rental_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// === Register Endpoint ===
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).send("Database error");

    if (results.length > 0) {
      return res.status(400).send("Already registered");
    }

    // Insert new user
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err) => {
        if (err) {
          console.error("Insert Error:", err);
          return res.status(500).send("Error registering user");
        }

        return res.status(200).send("Registered successfully");
      }
    );
  });
});

// === Login Endpoint ===
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required.");
  }

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Login Error:", err);
        return res.status(500).send("Database error");
      }

      if (results.length === 0) {
        return res.status(401).send("Invalid email or password");
      }

      return res.status(200).send("Success");
    }
  );
});

// === Test Route (optional) ===
app.get("/test-register", (req, res) => {
  const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  };

  db.query("SELECT * FROM users WHERE email = ?", [testUser.email], (err, results) => {
    if (err) return res.status(500).send("Database error");

    if (results.length > 0) {
      return res.status(400).send("Test user already exists");
    }

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [testUser.name, testUser.email, testUser.password],
      (err) => {
        if (err) return res.status(500).send("Error inserting test user");

        res.send("✅ Test user registered successfully!");
      }
    );
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
