const { Post } = require("../models/post.model");
const multer = require("multer");
const { access, constants } = require("fs");

exports.insert = (req, res) => {
  const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
  const filename = uniqueSuffix + ".jpg";
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `upload/`);
    },
    filename: function (req, file, cb) {
      cb(null, filename);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  let file = `./upload/${filename}`;

  upload(req, res, (err) => {
    if (!err) {
      access(file, constants.F_OK, (err) => {
        const { body } = req;
        if (err) {
          body.image_url = "";
        } else {
          body.image_url = filename;
        }
        Post.create(body)
          .then((result) => {
            res.status(201).send("Created post successfully!");
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      });
    }
  });
};

exports.getAll = (req, res) => {
  Post.find()
    .populate("author")
    .populate("likes")
    .populate("comments.author")
    .then((result) => {
      res.send(result);
    });
};

exports.getById = async (req, res) => {
  Post.find({ author_id: req.params.IdPost }).then((result) => {
    res.send(result);
  });
};

exports.like = async (req, res) => {
  const { body } = req;
  const doc = await Post.findById(body.postId);
  doc.likes.push(body.userId);
  doc.save().then((result) => {
    res.status(200).send("OK");
  });
};

exports.unlike = async (req, res) => {
  const { body } = req;
  const doc = await Post.findById(body.postId);
  doc.likes.pull(body.userId);
  doc.save().then((result) => {
    res.status(200).send("OK");
  });
};

exports.deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.postId)
    .then((result) => {
      res.status(200).send("OK");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.comment = async (req, res) => {
  const { body } = req;
  const doc = await Post.findById(body.postId);
  doc.comments.push({ author: body.userId, content: body.content });
  doc.save().then((result) => {
    res.status(200).send("OK");
  });
};
