import { useState } from "react"
import { CustomModal } from "./CustomModal";
import { GeoJSON, Marker } from "react-leaflet";
import { calculateCentroid } from "../utils/calculateCentroid";
import customIcon from "../assets/customIcon";


export function Building({geoData}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const geoDataCentroid = calculateCentroid(geoData.geometry.coordinates);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <GeoJSON
                data={geoData}
                style={
                    {
                        color: "blue",
                        weight: 2
                    }
                }
            />
            <Marker
                position={geoDataCentroid}
                icon={customIcon}
                eventHandlers={{
                    click: openModal
                }}
            /> 
            <CustomModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                image={geoData.properties.image}
            />
        </>
    );    
}