
import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.api_key; // Replace with your key or use dotenv
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
