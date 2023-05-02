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

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.findById = async (id) => {
  const result = await User.findById(id);
  // delete result._id;
  // delete result.__v;
  return result;
};

exports.changeAvt = async (body) => {
  await User.findByIdAndUpdate(body._id, { avatar: body.avatar });
};

exports.changeName = async (id, fname, lname) => {
  await User.findByIdAndUpdate(id, {
    firstName: fname,
    lastName: lname,
  });
};

exports.changeEmail = async (id, email) => {
  await User.findByIdAndUpdate(id, {
    email: email,
  });
};

// exports.getAll = async () => {
//   return await User.find({});
// };
