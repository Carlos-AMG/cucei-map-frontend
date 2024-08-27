import { MapContainer, TileLayer, Polygon, GeoJSON} from "react-leaflet";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import React from "react";
import { Building } from "./Building";
import axios from "axios";

export function Map({campusName}){
    const [campus, setCampus] = useState(null);
    const [buildings, setBuildings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/buildings")
        .then(response => {
            setBuildings(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/campuses/" + campusName)
        .then(response => {
            setCampus(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);


    // This must be calculated based on the university, hardcoded for CUCEI
    // World bounds to create the mask
    const worldBounds = [
        [-90, -180],
        [-90, 180],
        [90, 180],
        [90, -180]
    ]

    const campusBounds = campus ? campus.geojson.coordinates[0].map(coord => [coord[1], coord[0]]) : null;

    return (
        <MapContainer
            style={{ height: "100vh", width: "100%" }}
            center={[20.6574, -103.3258]} // Adjust this to center the Campus area
            zoom={16} // Adjust the zoom level to fit the Campus area
            maxBounds={campusBounds || worldBounds} // Set the max bounds to the Campus area
        >
            {/* Base map layer */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Mask Layer to hide the outside area */}
            {campusBounds && (
                <Polygon
                    positions={[worldBounds, campusBounds]}
                    pathOptions={{ color: "white", fillOpacity: 1 }}
                />
            )}

            {/* Display Campus boundary */}
            {campus && campus.geojson && (
                <GeoJSON data={campus.geojson} style={{ color: "purple", weight: 2, fillOpacity: 0 }} />
            )}

            {/* Display buildings */}
            {buildings.map(building => (
                <Building geoData={building.geojson} key={building.name} />
            ))}

        </MapContainer>
    )

}