import React from "react";
import { MapContainer, TileLayer, GeoJSON, Polygon } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import cuceiGeo from "./cucei_geo.json";  // Assuming you imported the CUCEI geo data
// import cuceiBuildings from "./cucei_buildings.json";  // Assuming you imported the CUCEI buildings

export function CuceiMap() {
    // World bounds to create the mask
    const worldBounds = [
        [-90, -180],  // Southwest corner of the world
        [-90, 180],   // Southeast corner of the world
        [90, 180],    // Northeast corner of the world
        [90, -180],   // Northwest corner of the world
    ];

    // Coordinates for the CUCEI boundary
    const cuceiBounds = cuceiGeo.coordinates[0].map(coord => [coord[1], coord[0]]);

    return (
        <MapContainer 
            style={{ height: '100vh', width: '100%' }} 
            center={[20.6574, -103.3258]}  // Adjust this to center the CUCEI area
            zoom={16}  // Adjust the zoom level to fit your area
            maxBounds={cuceiBounds}  // Set the max bounds to the CUCEI area
        >
            {/* Base map layer */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Mask Layer to hide the outside area */}
            <Polygon 
                positions={[worldBounds, cuceiBounds]} 
                pathOptions={{ color: "white", fillOpacity: 1 }} 
            />

            {/* Display CUCEI buildings */}
            {/* <GeoJSON data={cuceiBuildings} style={{ color: "blue", weight: 2 }} /> */}

            {/* Display CUCEI boundary */}
            <GeoJSON data={cuceiGeo} style={{ color: "purple", weight: 2, fillOpacity: 0 }} />
        </MapContainer>
    );
}
