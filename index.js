// index.js
// where your node app starts

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS to allow remote testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static("public"));

// Serve the homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Sample endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// ✅ Required endpoint
app.get("/api/whoami", function (req, res) {
  res.json({
    ipaddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// Start server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
