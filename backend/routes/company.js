import express from "express";
import isAuthenticated from "../middleswares/isAuthenticated.js"; // Fixed typo: `middleswares` to `middlewares`
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.js";
import { postJob } from "../controllers/job.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerCompany); // Changed endpoint to `/register`
router.get("/getCompany", isAuthenticated, getCompany); // Changed method to GET and added middleware
router.get("/getCompanybyId/:id", isAuthenticated, getCompanyById); // Changed method to GET and added middleware
router.put("/update-company/:id", isAuthenticated, updateCompany); // Changed method to PUT and added middleware 

export default router;
