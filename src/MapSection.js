import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Polygon, GeoJSON} from "react-leaflet";
import { BuildingGeo } from './BuildingGeo';
import geoData from "./assets/geojson/cuceiGeo.json"
import rectoriaData from "./assets/geojson/rectoriaGeo.json"
import xData from "./assets/geojson/xGeo.json"


export function MapSection({selectedCareer}){
    const worldBounds = [
        [-90, -180], 
        [-90, 180],
        [90, 180],
        [90, -180]
    ]
    const bounds = geoData.coordinates[0].map(coord => [coord[1], coord[0]]);

    // fetch points of interest (POI) based on career



    return (
        <>
            <MapContainer
                style={{height: "100vh", width: "100%"}}
                center={[20.6574, -103.3258]}
                zoom={16}
                maxBounds={bounds}
            >
                {/* Base map layer */}
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Mask Layer to hide the outside area */}
                <Polygon 
                    positions={[worldBounds, bounds]}
                    pathOptions={{color: "white", fillOpacity: 1}}
                />

                {/* bounds display */}
                <GeoJSON 
                    data={geoData}
                    style={{color: "purple", weight: 2, fillOpacity: 0}}
                />

                {/* buildings display */}
                <BuildingGeo 
                    geoData={rectoriaData}
                />
                
                <BuildingGeo 
                    geoData={xData}
                />

                

            </MapContainer>
        </>
    );
}