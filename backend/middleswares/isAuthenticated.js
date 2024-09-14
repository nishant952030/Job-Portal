import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Extract token from cookies

        if (!token) {
            // If no token, return 401 (Unauthorized)
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Verify token and extract userId
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded)
        // Attach userId to the request object for future use in routes
        req.userId = decoded.userId;
        // Proceed to the next middleware/controller
        next();
    } catch (error) {
        // Catch any errors during the token verification process
        console.error("Error in authentication:", error);
        return res.status(403).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;
