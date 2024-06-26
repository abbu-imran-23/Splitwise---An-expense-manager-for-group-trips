import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { addPaymentMethod, deletePaymentMethod, updatePaymentMethod } from "../controllers/PaymentMethods";
import { isAuthorized } from "../middlewares/isAuthorized";

const router: Router = express.Router();

/*     PAYMENT ROUTES     */
router.post("/addPaymentMethod/:userId", auth, isAuthorized, addPaymentMethod);
router.put("/updatePaymentMethod/:userId", auth, updatePaymentMethod);
router.delete("/deletePaymentMethod/:userId", auth, deletePaymentMethod);

export default router;