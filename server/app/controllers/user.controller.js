const { User } = require("../models/user.model");
const crypto = require("crypto");

exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  const user = new User(req.body);
  user.save().then((result) => {
    res.status(201).send({ id: result._id });
  });
};

exports.getById = (req, res) => {
  User.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.findUserByName = async (req, res) => {
  User.find({ name: { $regex: ".*" + req.params.keyword + ".*" } }).then(
    (result) => {
      res.status(200).send(result);
    }
  );
};

exports.findUserByUsername = async (req, res) => {
  User.findOne({ username: req.params.username }).then((result) => {
    res.status(200).send(result);
  });
};
