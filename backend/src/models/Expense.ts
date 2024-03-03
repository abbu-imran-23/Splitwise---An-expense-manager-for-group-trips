import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {
        tripName: {
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
        totalAmount: {
            type: Number,
            required: true
        },
        amountTobePaidByEachTripMate: {
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
            require: true,
            default: false
        }
    }
)

export default mongoose.model("Expense", ExpenseSchema);