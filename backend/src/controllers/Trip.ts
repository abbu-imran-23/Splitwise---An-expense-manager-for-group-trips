import { Request, Response } from "express";
import Trip from "../models/Trip";
import User from "../models/User";

const createTrip = async (req: Request, res: Response) => {
    try {
        // Parse Trip Details from req body
        const { tripName, tripCreatedBy, tripMates, tripExpenses } = req.body;

        // Handle if any field is not entered by the trip creater
        if(!tripName || !tripCreatedBy || !tripMates) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the fields"
            })
        }

        // Create Trip
        const trip = await Trip.create({
            tripName,
            tripCreatedBy,
            tripMates,
            tripExpenses
        })

        const tripDetails = await Trip.findById(trip._id).populate("tripCreatedBy");
        await tripDetails?.populate("tripMates");
        // await tripDetails?.populate("tripExpenses");

        await User.findByIdAndUpdate(tripDetails?.tripCreatedBy._id, {
            $push: {
                trips: tripDetails
            }
        }, { new: true });

        tripDetails?.tripMates.forEach(async (tripMate) => {
            await User.findByIdAndUpdate(tripMate._id, {
                $push: {
                    trips: tripDetails
                }
            }, { new: true })
        })

        // Return Success Flag
        return res.status(200).json({
            success: true,
            message: "Trip created successfully",
            data: tripDetails
        })

    } catch (error) {
        // Send Failure flag
        res.status(500).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}

export { createTrip };