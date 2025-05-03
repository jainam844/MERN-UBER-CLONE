
import { validationResult } from 'express-validator';
import { getAddressCoordinate } from '../services/maps.service.js'; // ✅ named import
export const getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.query; // ✅ FIXED: match the query name
    try {
        const coordinates = await getAddressCoordinate(text); // pass 'text' instead of 'address'
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

