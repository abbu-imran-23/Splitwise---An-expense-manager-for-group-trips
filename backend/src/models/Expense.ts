import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {
        trip: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Trip"
        },
        expenseName: {
            type: String,
            required: true,
        },
        expenseCreater: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        amountSpent: {
            type: Number,
            required: true
        },
        amountTobePaidByEachExpenseMate: {
            type: Number,
            required: true
        },
        amountOwedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User"
            }
        ],
        paymentStatus: {
            type: Boolean,
            required: true,
            default: false
        }
    }
)

export default mongoose.model("Expense", ExpenseSchema);