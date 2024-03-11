import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { addTripMate, createTrip, deleteTrip, removeTripMate } from "../controllers/Trip";

const router: Router = express.Router();

/*     TRIP ROUTES     */
router.post("/createTrip", auth, createTrip);
router.delete("/deleteTrip/:tripId", auth, deleteTrip);
router.post("/:tripId/addTripMate/:tripMateId", auth, addTripMate);
router.delete("/:tripId/addTripMate/:tripMateId", auth, removeTripMate);

export default router;