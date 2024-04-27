import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import paymentSuccess from "../controllers/Payment"

const router: Router = express.Router();

/*     PAYMENT ROUTES     */
router.post("/user/:userId/expense/:expenseId/paymentMethod/:paymentMethodId/success", auth, paymentSuccess);

export default router;