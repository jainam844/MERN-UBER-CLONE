
import { validationResult } from 'express-validator';
import { getAddressCoordinate, getAutocompleteSuggestions, getDistanceBetweenPlaces } from '../services/maps.service.js';

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
    try {
        const result = await getDistanceBetweenPlaces(origin, destination);
        res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getAutocomplete = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text } = req.query;
    try {
        const suggestions = await getAutocompleteSuggestions(text);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Autocomplete error:', error.message);
        res.status(500).json({ message: 'Error fetching autocomplete suggestions' });
    }
}
