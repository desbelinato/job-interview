const express = require("express");
const router = express.Router();
const User = require("../../controllers/user.controller");
const { verifyToken } = require("../../middlewares/auth");
const { validate } = require("../../middlewares/validators/user.validator");

// router.get("/", User.show);
router.post("/", verifyToken, validate("create"), User.create);
// router.get("/:uid", User.showParticipant);
// router.put("/:uid", User.updateParticipant);
// router.delete("/:uid", User.deleteParticipant);

module.exports = { name: "user", router };
