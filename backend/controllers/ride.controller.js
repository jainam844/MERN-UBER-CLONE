import { validationResult } from "express-validator";
import { createRide, getFareDistance, startRideForUser } from "../services/ride.service.js";
import { getAddressCoordinate, getCaptainsInTheRadius } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.model.js";
import {confirmRideforUser} from "../services/ride.service.js";
export const createRides = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);
        const pickupCoordinates = await getAddressCoordinate(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 1000);
        ride.otp = "";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        })
    } catch (error) {
        console.error('Error creating ride:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export const getFareRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const ride = await getFareDistance(pickup, destination);
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error getting fare:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}
export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    try {
        const ride = await confirmRideforUser({ rideId, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error('Error confirming ride:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}
export const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await startRideForUser({ rideId, otp, captain: req.captain });
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}