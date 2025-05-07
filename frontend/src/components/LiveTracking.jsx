import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const RecenterMap = ({ latlng }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(latlng);
    }, [latlng, map]);
    return null;
};

const LiveTracking = () => {
    const [position, setPosition] = useState([23.0225, 72.5714]); // Default to Ahmedabad

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    console.log('Position:', latitude, longitude);
                },
                (err) => {
                    console.error('Geolocation error:', err);
                }
            );
        };

        updatePosition(); // Initial position fetch

        const intervalId = setInterval(updatePosition, 1000); // Every second
        return () => clearInterval(intervalId);
    }, []);

    return (
<MapContainer center={position} zoom={16} className="h-1/2 w-full">
<TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={position} />
            <RecenterMap latlng={position} />
        </MapContainer>
    );
};

export default LiveTracking;
