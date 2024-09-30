import Job from "../models/job.js";
// admin or recruiter will post the job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, position, company } = req.body;
        const userId = req.userId;

        if (!title || !description || !requirements || !salary || !location || !jobType || !position || !company) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            position: Number(position),
            company, // This should be an ObjectId
            created_by: userId
        });

        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job: newJob
        });
    } catch (error) {
        console.error("Error while posting job:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const getAlljobs = async (req, res) => {
    console.log("I am being called here");

    try {
        const keyword = req.query.keyword || "";
        const page = Number(req.query.page) || 1; // Pagination: default to page 1
        const pageSize = Number(req.query.pageSize) || 10; // Limit results per page

        let query = {};
        console.log("This is me from jobs query", keyword);

        if (keyword) {
            query = {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            };
        }

        // Fetch jobs from the database based on the query with pagination
        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize) // Pagination logic: skip previous pages
            .limit(pageSize); // Limit to page size

        // Count total jobs to send in response for pagination
        const totalJobs = await Job.countDocuments(query);

        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs,
            totalJobs, // Include total job count for pagination on the frontend
            page,      // Current page
            pageSize   // Page size
        });
    } catch (error) {
        console.error("Error while fetching jobs:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// student get a job by its id 
export const getJobById = async (req, res) => {
      try {
        const jobId = req.params.id;
        const jobs = await Job.findById(jobId).populate({ path: "company" });
       
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
      console.log(jobs);
        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// this functions will tell all the jobs created by the admin
export const get_jobs_posted_by_admin = async (req, res) => {
    try {
        const userId = req.userId
        const created_jobs = await Job.find({ created_by: userId });
        if (!created_jobs) {
            return res.status(400).json({
                message: "No jobs has beeb posted",
                success: false
            })
        }
        return res.status(200).json({
            created_jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateJobStatus = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { status } = req.body;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        job.status = status;

        await job.save();

        return res.status(200).json({
            message: "Job status updated successfully",
            success: true,
            job,
        });
    } catch (error) {
        console.error("Error updating job status:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
