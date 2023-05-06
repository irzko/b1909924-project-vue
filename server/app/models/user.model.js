const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    username: String,
    gender: Number,
    avatar_url: String,
    permissionLevel: Number,
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    username: this.username,
    avatar_url: this.avatar_url,
    gender: this.gender,
    permissionLevel: this.permissionLevel,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
