
import { validationResult } from 'express-validator';
import { getAddressCoordinate, getDistanceBetweenPlaces } from '../services/maps.service.js';

export const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.query;
    try {
        const coordinates = await getAddressCoordinate(text);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}


export const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.body;
console.log('Origin:', origin, 'Destination:', destination);
    try {
        const result = await getDistanceBetweenPlaces(origin, destination);
        res.status(200).json(result); // { distance: ..., duration: ... }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

