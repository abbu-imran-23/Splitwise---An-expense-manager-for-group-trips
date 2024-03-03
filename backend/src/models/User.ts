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
        acceptedPaymentTypes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "PaymentType"
            }
        ]
    }
)

export default mongoose.model("User", UserSchema);