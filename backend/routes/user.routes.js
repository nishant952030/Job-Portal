import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.js"
import isAuthenticated from "../middleswares/isAuthenticated.js";
import { singleUpload } from "../middleswares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(singleUpload,login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated,updateProfile);
export default router