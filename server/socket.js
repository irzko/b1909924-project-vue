const { io } = require("./app");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");

io.on("connect", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("create-post", async () => {
    const post = await Post.find()
      .populate("author")
      .populate("likes")
      .populate("comments.author");
    io.emit("load-post", post);
  });

  socket.on("delete-post", async () => {
    const post = await Post.find()
      .populate("author")
      .populate("likes")
      .populate("comments.author");
    io.emit("load-post", post);
  });

  socket.on("like", async ({ post_id, like_id }) => {
    const like = await Like.findAll({
      where: { post_id: post_id },
    });
    io.emit(`ll-${post_id}`, like);
  });
  socket.on("unlike", async ({ post_id, like_id }) => {
    const like = await Like.findAll({
      where: { post_id: post_id },
    });
    io.emit(`ll-${post_id}`, like);
  });

  socket.on("comment", async ({ comment_id, post_id }) => {
    const comment = await Comment.findOne({
      attributes: ["comment_id", "user_id", "content"],
      where: { comment_id: comment_id },
      include: [
        {
          model: User,
          as: "Author",
          attributes: ["name", "username", "avatar_url"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });
    io.emit(`lc-${post_id}`, comment);
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
