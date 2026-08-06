require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

// ===============================
// Configuration
// ===============================
const PORT = process.env.PORT || 3000;

// ===============================
// Middleware
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "CHANGE_ME",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Change to true when using HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        }
    })
);

// ===============================
// Routes
// ===============================

// Example API
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "Server is running!"
    });
});

// Example homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});