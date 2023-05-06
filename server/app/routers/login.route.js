const express = require("express");
const router = express.Router();

const ValidationMiddleware = require("../auth/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../auth/middlewares/permission.middleware");

router.post("/", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(1),
]);

exports.router = router;
