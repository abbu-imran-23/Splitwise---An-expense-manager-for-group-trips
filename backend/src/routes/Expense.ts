import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { addExpenseMate, createExpense, removeExpenseMate, updateExpense } from "../controllers/Expense";

const router: Router = express.Router();

/*     EXPENSE ROUTES     */
router.post("/createExpense", auth, createExpense);
router.put("/updateExpense/:expenseId", auth, updateExpense);
router.patch("/:expenseId/trip/:tripId/addExpenseMate/:tripMateId", auth, addExpenseMate);
router.patch("/:expenseId/trip/:tripId/removeExpenseMate/:tripMateId", auth, removeExpenseMate);

export default router;