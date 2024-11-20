import express from "express";
import isAuthenticated from "../middlewares/Authentication.js";
import {
  getJobById,
  getAdminJobs,
  getAllJobs,
  postJob,
} from "../controllers/jobController.js";
const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/getJobs", isAuthenticated, getAllJobs);
router.get("/getJob/:id", isAuthenticated, getJobById);
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

export default router;
