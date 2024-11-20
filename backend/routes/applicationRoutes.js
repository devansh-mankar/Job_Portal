import express from "express";
import isAuthenticated from "../middlewares/Authentication.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";
const router = express.Router();

router.post("/status/:id/update", isAuthenticated, updateStatus);
router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.get("/get", isAuthenticated, getAppliedJobs);

export default router;
