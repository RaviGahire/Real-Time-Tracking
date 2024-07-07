"use strict";

// Import the required modules
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

// Initialize express
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = socketio(server);

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Handle socket.io connections
io.on("connection", function (socket) {
    socket.on("send-location", function (data) {

        io.emit("receive-location", { id: socket.id, ...data })

    });
    // Notify clients when a user disconnects
    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id);
        console.log("User disconnected", socket.id);
    });
});

// Render the index page
app.get("/", function (req, res) {
    res.render("index.ejs");
});

// Start the server
const PORT = 3000;
server.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});



