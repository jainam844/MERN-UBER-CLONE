import { body, query } from "express-validator";
import express from 'express';
import { confirmRide, createRides, endRide, getFareRide, startRide } from "../controllers/ride.controller.js";
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', [
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
],
    createRides
)

router.get('/get-fare', [
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
],
    getFareRide
)
router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
   confirmRide
)
router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 4, max: 4}).withMessage('Invalid OTP'),
    startRide
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)


export default router;