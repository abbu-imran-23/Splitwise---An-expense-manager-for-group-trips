import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
    {
        tripName: {
            type: String,
            required: true
        },
        tripCreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        tripMates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User"
            }
        ],
        tripExpenses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Expense"
            }
        ]
    }
)

export default mongoose.model("Trip", TripSchema);
