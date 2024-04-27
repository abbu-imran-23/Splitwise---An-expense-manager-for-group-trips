import express, { Router } from "express";
import { auth } from "../middlewares/auth";
import { addTripMate, createTrip, deleteTrip, removeTripMate, updateTripName } from "../controllers/Trip";
import { isAuthorized } from "../middlewares/isAuthorized";

const router: Router = express.Router();

/*     TRIP ROUTES     */
router.post("/createTrip", auth, isAuthorized, createTrip);
router.delete("/deleteTrip/:tripId", auth, isAuthorized, deleteTrip);
router.patch("/updateTrip/:tripId", auth, updateTripName);
router.post("/:tripId/addTripMate/:tripMateId", auth, addTripMate);
router.delete("/:tripId/addTripMate/:tripMateId", auth, removeTripMate);

export default router;