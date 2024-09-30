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
        const existing_applicant = await Application.findOne({ applicant: userId, job: jobId });
        if (existing_applicant) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }


        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }


        const applicant = await Application.create({
            job: jobId,
            applicant: userId,
        });


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
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({
                path: 'applications',
                options: { sort: { createdAt: -1 } },
                populate: { path: 'applicant' }
            });
console.log(job)
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
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
            success: true,
            application
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
export const alreadyApplied = async (req, res) => {
    try {
        console.log('User ID:', req.userId);  // Check if req.userId is available

        const jobId = req.params.id;
        const userId = req.userId;
        console.log(userId, jobId);

        const job = await Application.find({ job: jobId, applicant: userId });
        console.log('Job:', job);

        // Check if the job array is empty
        if (job.length === 0) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
            success: false
        });
    }
};
