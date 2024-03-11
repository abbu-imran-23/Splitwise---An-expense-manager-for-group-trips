import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { createExpense, updateExpense } from "../controllers/Expense";

const router: Router = express.Router();

/*     TRIP ROUTES     */
router.post("/createExpense", auth, createExpense);
router.put("/updateExpense/:expenseId", auth, updateExpense);

export default router;