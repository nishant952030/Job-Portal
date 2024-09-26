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
// student gets all the jobs posted with the search keyword
export const getAlljobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        // Fetch jobs from the database based on the query
        const jobs = await Job.find(query).populate({path:"company"}).sort({created_at:-1});
        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            jobs
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
        const jobId = req.params.id
        const jobs = await Job.findById(jobId)
        if (!jobs) {
            return req.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs, success: true
        })
    } catch (error) {
        console.log(error)
    }
}
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
