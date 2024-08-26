import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Example GeoJSON data
const states = [
    {
        "type": "Feature",
        "properties": { "party": "Republican" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22, 48.98],
                [-96.58, 45.94],
                [-104.03, 45.94],
                [-104.05, 48.99]
            ]]
        }
    },
    {
        "type": "Feature",
        "properties": { "party": "Democrat" },
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-109.05, 41.00],
                [-102.06, 40.99],
                [-102.03, 36.99],
                [-109.04, 36.99],
                [-109.05, 41.00]
            ]]
        }
    }
];

// Custom style function for GeoJSON features
const getStyle = (feature) => {
    switch (feature.properties.party) {
        case 'Republican': return { color: "#ff0000" };
        case 'Democrat':   return { color: "#0000ff" };
        default:           return { color: "#000000" };
    }
};

// Custom icon for the marker
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // URL to the marker icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor of the icon
    popupAnchor: [1, -34] // Popup anchor
});

// Function to calculate the centroid of a polygon (average of the points)
const calculateCentroid = (coordinates) => {
    let latSum = 0;
    let lngSum = 0;
    let numPoints = coordinates[0].length;

    coordinates[0].forEach(point => {
        latSum += point[1]; // Latitude
        lngSum += point[0]; // Longitude
    });

    return [latSum / numPoints, lngSum / numPoints];
};

export function SimpleMap() {
    // Calculate the centroid of the Republican polygon
    const republicanState = states.find(state => state.properties.party === "Republican");
    const republicanCentroid = calculateCentroid(republicanState.geometry.coordinates);

    return (
        <MapContainer 
            center={[48.99, -104.05]} // Center the map on a general area
            zoom={6} 
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON 
                data={states} 
                style={(feature) => getStyle(feature)}
            />
            <Marker position={republicanCentroid} icon={customIcon}>
                <Popup>
                    Republican Party
                </Popup>
            </Marker>
        </MapContainer>
    );
}
