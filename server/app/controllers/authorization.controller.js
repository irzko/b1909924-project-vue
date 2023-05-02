const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

exports.login = async (req, res) => {
  const jwtSecret = "irzko";
  try {
    let refreshId = req.body.userId + jwtSecret;
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(refreshId)
      .digest("base64");
    req.body.refreshKey = salt;
    let token = jwt.sign(req.body, jwtSecret);
    let b = Buffer.from(hash);
    let refresh_token = b.toString("base64");
    console.log(req.body.userId);
    const user = await User.findById(req.body.userId);

    // res.status(201).send({
    //   _id: req.body.userId,
    //   accessToken: token,
    //   refreshToken: refresh_token,
    // });
    res.status(201).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errors: err });
  }
};
