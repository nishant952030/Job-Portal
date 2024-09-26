import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log('Cookies received:', req.cookies);

    
        const token = req.cookies.token;
        console.log("token in  isAuthentic middleware",token)
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

         

        // Verify the token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        console.log('Decoded token:', decoded);

        // Attach the user ID to the request for further use
        req.userId = decoded.userId;
        console.log('User ID set on request:', req.userId);

        // Continue to the next middleware/route
        next();
    } catch (error) {
        console.error("Error in authentication:", error);

        // Handle token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token has expired",
                success: false
            });
        }

        // Handle invalid token
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                message: "Invalid token",
                success: false
            });
        }

        // Generic error response for other errors
        return res.status(403).json({
            message: "Authentication failed",
            success: false
        });
    }
};

export default isAuthenticated;
