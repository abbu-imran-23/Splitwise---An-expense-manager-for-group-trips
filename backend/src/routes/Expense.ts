import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { createExpense } from "../controllers/Expense";

const router: Router = express.Router();

/*     TRIP ROUTES     */
router.post("/createExpense", auth, createExpense);

export default router;