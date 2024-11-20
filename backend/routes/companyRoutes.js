import express from "express";
import isAuthenticated from "../middlewares/Authentication.js";
import {
  getCompany,
  getCompanyById,
  updateCompany,
  registerCompany,
} from "../controllers/companyController.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", isAuthenticated, registerCompany);
router.get("/getCompany", isAuthenticated, getCompany);
router.get("/getCompany/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

export default router;
