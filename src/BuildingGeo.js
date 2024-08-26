import { calculateCentroid } from "./utils/calculateCentroid.js"
import { GeoJSON, Marker } from "react-leaflet";
import L from 'leaflet';
import ReactModal from "react-modal";
import { useState } from "react";
import customIcon from "./assets/customIcon.js";


export function BuildingGeo({geoData, modal}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const geoDataCentroid = calculateCentroid(geoData.geometry.coordinates);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    ReactModal.setAppElement('#root');

    return (
        <>
            <GeoJSON 
                data={geoData}
                style={{color: "blue", weight: 2}}
            />

            <Marker position={geoDataCentroid} icon={customIcon} eventHandlers={{click: openModal}}/>

            <ReactModal
               isOpen={isModalOpen}
               onRequestClose={closeModal}
               contentLabel="Marker Modal"
               style={{
                   content: {
                       top: '50%',
                       left: '50%',
                       right: 'auto',
                       bottom: 'auto',
                       marginRight: '-50%',
                       transform: 'translate(-50%, -50%)',
                       zIndex: '1000', // Ensure modal appears above map
                   },
                   overlay: {
                       zIndex: '1000', // Ensure modal overlay appears above map
                   },
               }} 
            >
                {geoData.properties.image && <img src={require(`./assets/cuceiBuildings/${geoData.properties.image}`)}/>}
                <h2>Building: {geoData.properties.name}</h2>
                <p>Building data</p>
                <button onClick={closeModal}>Close</button>
            </ReactModal>


        </>
    );
}