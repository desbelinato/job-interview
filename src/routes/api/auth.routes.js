const express = require("express");
const router = express.Router();
const { userLogin, refreshToken, userLogout } = require("../../middlewares/auth");
const Auth = require("../../controllers/auth.controller");

router.post("/singin", userLogin, Auth.signin);
router.post("/refresh", refreshToken, Auth.refresh);
router.post("/logout", userLogout, Auth.logout);

module.exports = { name: "auth", router };
