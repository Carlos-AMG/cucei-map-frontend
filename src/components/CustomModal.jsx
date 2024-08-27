

import ReactModal from "react-modal";


export function CustomModal({isModalOpen, closeModal, image}){
    ReactModal.setAppElement("#root");

    return (
        <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Marker Modal"
            style={
                {
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
                }
            }
        >
            {/* {image && <img src={require(`../assets/cuceiBuildings/${image}`)}/>} */}
            <h2>Building: </h2>
            <p>Building data</p>
            <button onClick={closeModal}>Close</button>
        </ReactModal>
    );
}