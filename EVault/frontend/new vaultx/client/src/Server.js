const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
const corsOptions = {
  origin: "http://localhost:3000", // Adjust this based on your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Use cors middleware with specified options
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Users array (simulating a database)
const users = [
  { username: "user", password: "password" },
  // Add more users as needed
];

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulate a database lookup
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    console.log(`Login successful for user: ${username}`);
    // In a real scenario, you would generate a token and send it to the client
    // For testing purposes, just send a success message
    res.json({ message: "Login successful", token: "your_generated_token" });
  } else {
    console.log(`Login failed for user: ${username}`);
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
