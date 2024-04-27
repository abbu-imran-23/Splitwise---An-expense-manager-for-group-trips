import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

interface RequestWithUser extends Request {
	user?: JWT.JwtPayload
}

const isAuthorized = async(req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        // Parse userId
        const userId = req.params.userId || req.body.userId;

        // Handle if userId is not passed
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is missing"
            })
        }

        // Check if the logged-in user's ID matches the userId provided in the request parameters
        if (userId !== req.user?.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to perform this action"
            });
        }

        // Next Middleware
        next();
    } catch (error) {
         // Handle errors
         res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        });
    }
}

export { isAuthorized }