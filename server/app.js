const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
// const ApiError = require("./app/api-error");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/", require("./app/routers/routes.config"));
app.use("/upload", express.static("upload"));

// app.use((req, res, next) => {
//   return next(new ApiError(404, "Resource not found"));
// });

// app.use((err, req, res, next) => {
//   return res.status(err.statusCode || 500).json({
//     message: err.message || "Internal Server Error",
//   });
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to popbox application." });
});

module.exports = { app, io };
