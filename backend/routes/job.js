import express from "express"
import isAuthenticated from "../middleswares/isAuthenticated.js";
import { get_jobs_posted_by_admin, getAlljobs, getJobById, postJob } from "../controllers/job.js";
const router = express.Router();
router.post("/create-job", isAuthenticated, postJob);
router.get("/search-jobs", getAlljobs);
router.get("/get-job/:id", getJobById);
router.get("/admin-jobs", isAuthenticated, get_jobs_posted_by_admin);
export default router;