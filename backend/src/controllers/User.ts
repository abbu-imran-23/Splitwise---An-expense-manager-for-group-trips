import { Request, Response } from "express";
import User from "../models/User";

const getUserDetails = async (req: Request, res: Response) => {
    try {
        // Parse userId
        const { userId } = req.params;

        // Check if the user exist
        const user = await User.findById(userId).populate(["trips", "paymentsToBePaid", "paymentsToBeRecieved", "acceptedPaymentMethods"]);

        // Handle if user doesnot exist in DB
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // Make password ""
        user.password = "";

        // Success flag
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: user
        })

    } catch (error) {
        // Send Failure flag
        res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

const getAllUserDetails = async (req: Request, res: Response) => {
    try {
        // Fetch all users
        const users = await User.find();
        console.log(users);

        if(!users) {
            res.status(404).json({
                success: false,
                message: "No Users found",
            })
        }

        // Success flag
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: users
        })

    } catch (error) {
        // Send Failure flag
        res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

export { getUserDetails, getAllUserDetails }