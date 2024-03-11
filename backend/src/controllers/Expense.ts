import { Request, Response } from "express"
import Expense from "../models/Expense";
import Trip from "../models/Trip";
import User from "../models/User";

const createExpense = async (req: Request, res: Response) => {
    try {
        // Parse Expense details from req.body
        const { trip, expenseName, expenseCreater, amountSpent, amountOwedBy} = req.body;

        // Handle if any field is not entered by the expense creater
        if(!trip || !expenseName || !expenseCreater || !amountSpent || !amountOwedBy) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        const amountTobePaidByEach = amountSpent / (amountOwedBy.length + 1);

        // Create Expense
        const expense = await Expense.create({
            trip,
            expenseName,
            expenseCreater,
            amountSpent,
            amountOwedBy,
            amountTobePaidByEachExpenseMate: amountTobePaidByEach
        })

        // Push expense to the Trip's tripExpenses array
        await Trip.findByIdAndUpdate(trip, {
            $push: {
                tripExpenses: expense._id
            }
        }, { new: true })

        // Push the Expense to Owed users' paymentsToBePaid
        await User.updateMany(
            { _id: { $in: amountOwedBy } },
            { $push: { paymentsToBePaid: expense._id } }
        );

        // Push the Expense to expense creater's paymentsToBeRecieved
        await User.findByIdAndUpdate(expenseCreater, {
            $push: {
                paymentsToBeRecieved: expense._id
            }
        })

        // Send success flag
        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });

    } catch (error) {
        // Send Failure flag
        res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

// Update Expense
const updateExpense = async (req: Request, res: Response) => {
    try {

        // Parse expenseId
        const { expenseId } = req.params;

        // Handle if expenseId is not passed
        if(!expenseId) {
            return res.status(404).json({
                success: false,
                message: "expenseId is missing"
            })
        }

        // Parse Expense details from req.body
        const { trip, expenseName, expenseCreater, amountSpent, amountOwedBy} = req.body;

        // Handle if any field is not entered by the expense creater
        if(!trip || !expenseName || !expenseCreater || !amountSpent || !amountOwedBy) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Calculate Each ExpenseMate's share
        const amountTobePaidByEach = amountSpent / (amountOwedBy.length + 1);

        // Update in DB
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, {
            trip,
            expenseName,
            expenseCreater,
            amountSpent,
            amountOwedBy,
            amountTobePaidByEachExpenseMate: amountTobePaidByEach
        }, { new: true })

        // Success flag
        return res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: updatedExpense
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

export { createExpense, updateExpense }