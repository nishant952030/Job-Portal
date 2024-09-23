import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        console.log(req.body)
        if (!fullname || !email || !phoneNumber || !password || !role) {
            console.log(fullname, email, phoneNumber, password, role)
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false,
            });
        }
        const data = req.body
        const existingUser = await User.findOne({ email }, { _id: 1 });
        if (existingUser) {
            return res.status(409).json({
                data,
                message: "User already exists, please login",

                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullname,
            email,
            phone: phoneNumber,
            password: hashedPassword,
            role
        });
        console.log("newly created user", newUser)
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: newUser
        });
    } catch (error) {
        console.error("Error while registering user:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};



export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "Incorrect role",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        const cookieOptions = {
            httpOnly: true,
            secure: true,  // ensures cookies are only sent over HTTPS
            sameSite: 'None' // allows cross-site cookies (for different origins)
        };
        res.cookie('token', token, cookieOptions);

        return res.status(200).json({
            message: `Welcome back, ${user.fullname}`,
            success: true,
            user,
            token
        });

    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message 
        });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successful",
            success: true
        });
    } catch (error) {
        console.error("Error while logging out", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phone, bio, skills } = req.body;
        const resume = req.file;
        const userId = req.userId;

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        if (resume) {
            if (resume.mimetype !== "application/pdf") {
                return res.status(400).json({
                    message: "Only PDF files are allowed",
                    success: false
                });
            }

            const fileUrl = getDataUri(resume);
            const cloudRes = await cloudinary.uploader.upload(fileUrl.content);

            if (cloudRes) {
                user.profile.resume = cloudRes.secure_url;
                user.profile.resumeOriginalName = resume.originalname;
            }
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = Array.isArray(skills) ? skills : skills.split(',');


        await user.save();

        const updatedUser = await User.findById(userId);
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true
        });

    } catch (error) {
        console.error("Error while updating profile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
export const updateProfilePic = async (req, res) => {
    const userId = req.userId;
    const pic = req.file;
    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        if (!pic) {
            return res.status(400).json({
                message: "No picture found in the request",
                success: false,
            });
        }

        if (pic.mimetype === 'image/jpeg' || pic.mimetype === 'image/png') {
            const fileUrl = getDataUri(pic);
            const cloudRes = await cloudinary.uploader.upload(fileUrl.content);

            if (cloudRes && cloudRes.secure_url) {
                user.profile.profile = cloudRes.secure_url;
                await user.save();

                return res.status(200).json({
                    message: "Profile pic updated successfully",
                    user: user,
                    success: true
                });
            } else {
                throw new Error("Failed to upload image to Cloudinary");
            }
        } else {
            return res.status(400).json({
                message: "Invalid file type. Only JPEG and PNG are allowed.",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile picture",
            success: false,
            error: error.message
        });
    }
}
