import mongoose from "mongoose";

const PaymentType = new mongoose.Schema(
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

export default mongoose.model("PaymentType", PaymentType);