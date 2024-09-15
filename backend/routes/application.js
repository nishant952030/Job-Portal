import express from "express"
import isAuthenticated from "../middleswares/isAuthenticated.js";
import { apply_for_job, get_all_applied_jobs, getApplicants, updateUser } from "../controllers/application.js";

const router = express.Router();
router.post("/apply-to/:id", isAuthenticated, apply_for_job);
router.get("/applied-jobs/", isAuthenticated, get_all_applied_jobs);
router.get("/get-all-applicants/:id", isAuthenticated, getApplicants);
router.post("/update-status/:id", isAuthenticated, updateUser);

export default router;