import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { getAllUserDetails, getUserDetails } from "../controllers/User";
import { isAuthorized } from "../middlewares/isAuthorized";

const router: Router = express.Router();

/*     USER ROUTES     */
router.get("/:userId", auth, isAuthorized, getUserDetails);
router.get("/:userId/getAllUsers", auth, isAuthorized, getAllUserDetails);

export default router;