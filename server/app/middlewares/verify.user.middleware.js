const mongoose = require("mongoose");
const UserModel = mongoose.model("User");
const crypto = require("crypto");

exports.isPasswordAndUserMatch = (req, res, next) => {
  UserModel.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(404).send({});
    } else {
      let passwordFields = user.password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user._id,
          email: user.email,
          permissionLevel: user.permissionLevel,
          // provider: "email",
          name: user.name,
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid email or password"] });
      }
    }
  });
};
