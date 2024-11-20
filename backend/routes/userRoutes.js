import express from "express";
import {
  register,
  login,
  updateProfile,
  logout,
} from "../controllers/userController.js";
import isAuthenticated from "../middlewares/Authentication.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/updateProfile", isAuthenticated, singleUpload, updateProfile);

router.get("/logout", logout);

export default router;
