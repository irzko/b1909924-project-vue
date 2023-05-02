const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const { Post } = require("./app/models/post.model");
// const ApiError = require("./app/api-error");
const app = express();

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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4000"],
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("create-post", async () => {
    const post = await Post.find()
      .populate("author")
      .populate("likes")
      .populate("comments.author")
      .sort({ createdAt: -1 });
    io.emit("load-post", post);
  });

  socket.on("delete-post", async () => {
    const post = await Post.find()
      .populate("author")
      .populate("likes")
      .populate("comments.author")
      .sort({ createdAt: -1 });
    io.emit("load-post", post);
  });

  socket.on("like", async ({ postId }) => {
    const post = await Post.findById(postId);
    io.emit(`ll-${postId}`, post.likes);
  });
  socket.on("unlike", async ({ postId }) => {
    const post = await Post.findById(postId);
    io.emit(`ll-${postId}`, post.likes);
  });

  socket.on("comment", async ({ postId }) => {
    const post = await Post.findById(postId).populate("comments.author");
    io.emit(`lc-${postId}`, post.comments);
  });
  ``;
  socket.on("chat", async (data) => {
    const chat = await Message.findAll({
      where: {
        [Op.or]: [
          { sender_id: data.friend_id, recipient_id: data.user_id },
          { sender_id: data.user_id, recipient_id: data.friend_id },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    io.emit("load-chat", chat);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

module.exports = { server, io };
