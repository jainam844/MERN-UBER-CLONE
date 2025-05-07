import { getDistanceBetweenPlaces } from '../services/maps.service.js';
import rideModel from '../models/ride.model.js';
import crypto from 'crypto';

export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(pickup, destination, vehicleType);
    if (!fare) {
        throw new Error('Fare calculation failed');
    }
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare,
    });
    return ride;
};

export async function getFare(pickup, destination, vehicleType) {
    if (!pickup || !destination || !vehicleType) {
        throw new Error('Pickup, destination, and vehicleType are required');
    }
    const distanceTime = await getDistanceBetweenPlaces(pickup, destination);
    if (isNaN(distanceTime.distance) || isNaN(distanceTime.duration)) {
        throw new Error('Invalid distance or duration values');
    }
    // Define fare-related constants
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = Math.round(
        baseFare[vehicleType] +
        (distanceTime.distance * perKmRate[vehicleType]) +
        (distanceTime.duration * perMinuteRate[vehicleType])
    );

    return fare;
}
export async function getFareDistance(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup, destination are required');
    }
    const distanceTime = await getDistanceBetweenPlaces(pickup, destination);
    if (isNaN(distanceTime.distance) || isNaN(distanceTime.duration)) {
        throw new Error('Invalid distance or duration values');
    }
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    const fare = {
        auto: Math.round(
            baseFare.auto +
            (distanceTime.distance * perKmRate.auto) +
            (distanceTime.duration * perMinuteRate.auto)
        ),
        car: Math.round(
            baseFare.car +
            (distanceTime.distance * perKmRate.car) +
            (distanceTime.duration * perMinuteRate.car)
        ),
        moto: Math.round(
            baseFare.moto +
            (distanceTime.distance * perKmRate.moto) +
            (distanceTime.duration * perMinuteRate.moto)
        )
    };

    return fare;
}
export function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

export async function confirmRideforUser({ rideId, captain }) {

    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}