import { Request, Response } from "express"
import Expense from "../models/Expense";
import User from "../models/User";
import Trip from "../models/Trip";
import mongoose from "mongoose";

const createExpense = async (req: Request, res: Response) => {
    try {
        // Parse expense details from req body
        const { tripName, expenseName, expenseCreater, totalAmount, amountOwedBy, paymentStatus } = req.body;

        // Handle if any field is not entered by the expense creater
        if(!tripName || !expenseName || !expenseCreater || !totalAmount || !amountOwedBy) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        const amountTobePaidByEachTripMate = totalAmount / amountOwedBy.length;

        // Create Expense
        const expense = await Expense.create({
            tripName,
            expenseName,
            expenseCreater,
            totalAmount,
            amountTobePaidByEachTripMate,
            amountOwedBy,
            paymentStatus
        })

        const updatedTripDetails = await Trip.findByIdAndUpdate(tripName, {
            $push: {
                tripExpenses: expense
            }
        }, { new: true })
        .populate("tripExpenses");

        // Update Payment Status
        // const user = await User.findById(expenseCreater).populate("trips");
        // console.log(user);
        // const userTrip = user?.trips.filter((trip) => trip._id == tripName);
        // console.log("User Trips");

        // console.log(userExpense);


        // console.log(updatedTripDetails);

        // Return Success Flag
        return res.status(200).json({
            success: true,
            message: "Expense created successfully",
            data: expense
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

export { createExpense };