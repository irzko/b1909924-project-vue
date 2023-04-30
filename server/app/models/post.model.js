const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema(
  {
    content: String,
    image_url: String,
    author: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        content: String,
      },
    ],
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    content: this.content,
    image_url: this.image_url,
    author: this.author,
    likes: this.likes,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
