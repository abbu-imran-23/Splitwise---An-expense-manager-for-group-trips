import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        trips: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Trip"
            }
        ],
        acceptedPaymentMethods: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "PaymentMethod"
            }
        ],
        paymentsToBePaid: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Expense"
            }
        ],
        paymentsToBeRecieved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Expense"
            }
        ]
    }
)

export default mongoose.model("User", UserSchema);