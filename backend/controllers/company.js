import Company from "../models/company.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Register Company
export const registerCompany = async (req, res) => {
    try {
        const { companyName, companyWebsite, companyDescription, companyLocation } = req.body;
        const logo = req.file;
        console.log(logo,companyName,companyWebsite);
        
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

 
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't add the same company twice",
                success: false
            });
        }

        let logoUrl = null;
        if (logo) {
            const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimes.includes(logo.mimetype)) {
                return res.status(400).json({
                    message: 'Uploaded file is not a valid image.',
                    success: false
                });
            }

            const fileUrl = getDataUri(logo);
            const cloudRes = await cloudinary.uploader.upload(fileUrl.content);
            if (!cloudRes) {
                return res.status(500).json({
                    message: "Error uploading logo to Cloudinary",
                    success: false
                });
            }

           
            logoUrl = cloudRes.secure_url;
        }

  
        company = await Company.create({
            name: companyName,
            description: companyDescription,
            website: companyWebsite,
            location: companyLocation,
            logo: logoUrl,  
            userId: req.userId
        });

        return res.status(200).json({
            message: "Company registered successfully",
            success: true,
            company
        });

    } catch (error) {
        console.error("Error while registering company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

    // Get Companies for a User
    export const getCompany = async (req, res) => {
        try {
            const userId = req.userId; 
            console.log(userId)
            
            const companies = await Company.find({ userId }); // Get companies created by the user
            // console.log(companies+" "+userId)
            if (!companies || companies.length === 0) {
                return res.status(404).json({
                    message: "No companies found",
                    success: false
                });
            }

            return res.status(200).json({
                companies,
                success: true
            });

        } catch (error) {
            console.error("Error while getting companies:", error);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };

    // Get Company by ID
    export const getCompanyById = async (req, res) => {
        try {
            const companyId = req.params.id;
            const company = await Company.findById(companyId);

            if (!company) {
                return res.status(404).json({
                    message: "Company not found",
                    success: false
                });
            }

            return res.status(200).json({
                company,
                success: true
            });

        } catch (error) {
            console.error("Error while getting company by ID:", error);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };

    // Update Company
    export const updateCompany = async (req, res) => {
        try {
            const companyId = req.params.id;
            const { name, description, website, location } = req.body;

            const company = await Company.findById(companyId);

            if (!company) {
                return res.status(404).json({
                    message: "Company not found",
                    success: false
                });
            }

            if (name) {
                company.name = name;
            }

            if (description) {
                company.description = description;
            }

            if (website) {
                company.website = website;
            }

            if (location) {
                company.location = location;
            }

            await company.save();

            return res.status(200).json({
                message: "Company updated successfully",
                company,
                success: true
            });

        } catch (error) {
            console.error("Error while updating company:", error);
            return res.status(500).json({
                message: "Internal server error",
                success: false
            });
        }
    };
