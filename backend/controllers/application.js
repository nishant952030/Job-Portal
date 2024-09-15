import Application from "../models/application.js";
import Job from "../models/job.js";

export const apply_for_job = async (req, res) => {
    try {
        const userId = req.userId;
        const jobId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if the user has already applied for the job
        const existing_applicant = await Application.findOne({ applicant: userId, job: jobId });
        if (existing_applicant) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const applicant = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Push the applicant ID to the job's applications array
        job.applications.push(applicant._id);
        await job.save();

        return res.status(200).json({
            message: 'Yay, applied successfully!',
            applicant,
            success: true
        });
    } catch (error) {
        console.error("Error in applying for job:", error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
            success: false
        });
    }
};

// Function to get all jobs a user has applied for
export const get_all_applied_jobs = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }

        // Find all applications for the user, populate job and company data, and sort by creation date
        const applications = await Application.find({ applicant: userId })
            .populate({
                path: "job",
                populate: {
                    path: "company" // Nested population of the company field inside job
                }
            })
            .sort({ createdAt: -1 }); // Ensure correct field for timestamps


        // Check if the user has applied for any jobs
        if (applications.length === 0) {
            return res.status(404).json({
                message: "You have not applied to any jobs yet",
                success: false
            });
        }

        return res.status(200).json({
            message: "You have applied for these jobs",
            success: true,
            applications
        });
    } catch (error) {
        console.error("Error in fetching applied jobs:", error);
        return res.status(500).json({
            message: 'Something went wrong while fetching applied jobs',
            error: error.message,
            success: false
        });
    }
};

export const getApplicants = async (req, res) => {
    try {
        // Retrieve the jobId from the request parameters
        const jobId = req.params.id;

        // Find the job by ID and populate the 'applications' field with detailed 'applicant' information
        const job = await Job.findById(jobId)
            .populate({
                path: 'applications', // Populating the 'applications' field
                options: { sort: { createdAt: -1 } }, // Sorting applications by creation date (most recent first)
                populate: { path: 'applicant' } // Populating the 'applicant' field within each application
            });

        // If the job is not found, return a 404 error response
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        // Return the job with populated applicants in the response
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        // Log the error and return a 500 server error response
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
            success: false
        });
    }
};
export const updateUser = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        }
        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "application not found",
                success: false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "updated successfully",
            success:true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
            success: false
        });
    }
}