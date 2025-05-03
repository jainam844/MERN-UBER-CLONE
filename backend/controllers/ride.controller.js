import { validationResult } from "express-validator";
import { createRide } from "../services/ride.service.js";

export const createRides = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}