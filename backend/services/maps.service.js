
import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.api_key;

    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        const features = response.data.features;

        if (features && features.length > 0) {
            const [lng, lat] = features[0].geometry.coordinates;
            return { lat, lng };
        } else {
            throw new Error('No coordinates found for this address.');
        }
    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw error;
    }
};

const getCoordinates = async (place) => {
    const apiKey = process.env.api_key; // Replace with your key or use dotenv
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(place)}`;
    const response = await axios.get(url);
    const coords = response.data.features[0]?.geometry?.coordinates;
    if (!coords) throw new Error(`Coordinates not found for: ${place}`);
    return coords; 
};

export const getDistanceBetweenPlaces = async (origin, destination) => {
    const apiKey = process.env.api_key; 

    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);
    console.log('Origin:', originCoords, 'Destination:', destinationCoords);
    const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        {
            coordinates: [originCoords, destinationCoords],
        },
        {
            headers: {
                Authorization: apiKey,
                'Content-Type': 'application/json',
            },
        }
    );

    const summary = response.data.routes?.[0]?.summary;
    if (!summary) {
        throw new Error('Route summary not found. Invalid coordinates or API limit reached.');
    }
    return summary;
};