import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        console.log("newly created user",newUser)
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
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Set cookie options
        const cookieOptions = {
            httpOnly: true,    // Prevents JavaScript access to the cookie
            secure: true,      // Ensures the cookie is sent over HTTPS (use this in production)
            sameSite: 'Strict' // Ensures the cookie is only sent with requests from the same site
        };

        // Set the token cookie with the specified options
        const temp = res.cookie('token', token, cookieOptions);

        // Log cookie setting for debugging
       /*  console.log('Setting cookie:', {
            token: token.substring(0, 10) + '...',  // Log only part of the token for security
            options: cookieOptions
        }); */

        // Send the response
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
            error: error.message  // Include the error message for debugging
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
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.userId;  // Assuming userId is set in req by middleware

        // Find the user by ID
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Check each field and update only if provided
        if (fullname) {
            user.fullname = fullname;
        }

        if (email) {
            user.email = email;
        }

        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }

        if (bio) {
            user.profile.bio = bio;
        }

        if (skills) {
            // Convert skills from comma-separated string to array
            const skillsArray = skills.split(",");
            user.profile.skills = skillsArray;
        }

        // Save the updated user profile
        await user.save();

        // Return the updated user object
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullname,
                email,
                phoneNumber,
                'profile.bio': bio,
                'profile.skills': skills ? skills.split(",") : undefined
            },
            { new: true }  // This returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

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
