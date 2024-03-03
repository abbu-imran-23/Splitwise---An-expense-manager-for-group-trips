import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { createTrip } from "../controllers/Trip";

const router: Router = express.Router();

/*     TRIP ROUTES     */
router.post("/createTrip", auth, createTrip);

export default router;