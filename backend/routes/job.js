import express from "express"
import isAuthenticated from "../middleswares/isAuthenticated.js";
import { get_jobs_posted_by_admin, getAlljobs, getJobById, postJob, updateJobStatus } from "../controllers/job.js";
const router = express.Router();
router.post("/create-job", isAuthenticated, postJob);
router.get("/search-jobs", getAlljobs);
router.get("/get-job/:id", getJobById);
router.get("/admin-jobs", isAuthenticated, get_jobs_posted_by_admin);
router.put("/update-status/:id", isAuthenticated, updateJobStatus);
export default router;