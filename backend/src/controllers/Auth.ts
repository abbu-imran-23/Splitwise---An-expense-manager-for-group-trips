import { Request, Response } from "express";
const gmailValidator = require("google-gmail-validator");
import User from "../models/User";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    try {

        // Parse user details from request body
        const { name, email, password } = req.body;

        // Handle if any field is not entered by the user
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Validate Gmail
        if(!await gmailValidator.validateGmail(email)) {
            return res.status(401).json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // Handle if the user is already registered
        const isExistingUser = await User.findOne({ email });
        if(isExistingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exist, Please sign in with different email id"
            })
        }

        try {
            // Password Hashing
            const saltRounds: number = 10;
            const hashedPassword: string = await bcrypt.hash(password, saltRounds);

            // Insert into Database
            const user = await User.create({
                name, 
                email, 
                password: hashedPassword
            })

            // Make password ""
            user.password = ""

            // Send Success flag
            res.status(200).json({
                success: true,
                data: user,
                message: "User Registered Successfully"
            })
        } catch (error) {
            // Send failure flag
            res.status(500).json({
                success: false,
                error: error,
                message: "Something went wrong while hashing password, please try again later"
            })
        }

    } catch (error) {
         // Send failure flag
         res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

const login = async (req: Request, res:Response) => {
    try {
        
        // Parse user details from request body
        const { email, password } = req.body;

        // Handle if any field is not entered by the user
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Validate Gmail
        if(!await gmailValidator.validateGmail(email)) {
            return res.status(401).json({
                success: false,
                message: "Please enter a valid email"
            })
        }

        // Check if the user exist with the given email
        const userExist = await User.findOne({ email }).populate("trips");

        if(!userExist) {
            return res.status(404).json({
                success: false,
                message: "Email not registered"
            })
        }

        // Compare Passwords
        if(await bcrypt.compare(password, userExist.password)) {
            
            // Payload for JWT
            const payload = {
                id: userExist._id,
                name: userExist.name,
                email: userExist.email
            }

            // JWT Secret Key
            require("dotenv").config();
            const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY ?? "JWT_SECRET_KEY";

            // JSON Web Token
            const token = JWT.sign(payload, JWT_SECRET_KEY, {
                expiresIn: "12h"
            })

            const user = userExist.toObject();
            // user.token = token;
            user.password = "";

            // Options for cookie
            const options = {
                expires: new Date(Date.now() + 1000 * 60 * 60),
                httpOnly: true,
                secure: true
            }

            // Send token in cookie
            return res.cookie("authToken", token, options).status(200).json({
                success: true,
                authToken: token,
                data: user,
                message: "Login Successfull"
            })
        }

        // Incorrect Password
        res.status(401).json({
            success: false,
            message: "Incorrect password"
        })

    } catch (error) {
         // Send failure flag
         res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

export { register, login };