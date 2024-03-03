import { NextFunction } from "express";
import { Request, Response } from "express";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extracting JWT from request cookies, body or header
		const token =
        req.cookies.authToken ||
        req.body.authToken ||
        req.header("Authorization")?.replace("Bearer ", "");

        // If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ 
                success: false, 
                message: `Token Missing` 
            });
		}

        try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = JWT.verify(token, JWT_SECRET_KEY);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			// req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res.status(401).json({ 
                success: false, 
                message: "token is invalid" 
            });
		}

        // If JWT is valid, move on to the next middleware or request handler
		next();

    } catch (error) {
        // If there is an error during the authentication process, return 401 Unauthorized response
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
}

export { auth };