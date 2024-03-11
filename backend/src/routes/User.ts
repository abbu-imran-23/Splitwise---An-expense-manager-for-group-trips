import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { getUserDetails } from "../controllers/User";

const router: Router = express.Router();

/*     USER ROUTES     */
router.get("/:userId", auth, getUserDetails);

export default router;