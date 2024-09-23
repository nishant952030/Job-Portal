import express from "express"
import { login, logout, register, updateProfile, updateProfilePic } from "../controllers/user.js"
import isAuthenticated from "../middleswares/isAuthenticated.js";
import { singleUpload } from "../middleswares/multer.js";
const router = express.Router();
router.route("/register").post(singleUpload,register);
router.route("/login").post(singleUpload,login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile);
router.route("/profile/profile-pic").put(isAuthenticated,singleUpload,updateProfilePic);
export default router