import mongoose from "mongoose";

const PaymentMethod = new mongoose.Schema(
    {
        paymentName: {
            type: String,
            required: true
        },
        paymentNumber: {
            type: String,
            required: true,
        }
    }
)

export default mongoose.model("PaymentMethod", PaymentMethod);