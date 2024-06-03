import React from 'react';
import Trajectory from './Trajectory.jsx';
import VehicleMarker from './VehicleMarker';
import View from './View.jsx'

function RouteView({ selectedVehicle, trajectories, createVehicleIcon, handleCloseRouteView }) {
    return (
        <>
            <Trajectory trajectories={trajectories} selectedVehicle={selectedVehicle} />
            <VehicleMarker selectedVehicle={selectedVehicle} createVehicleIcon={createVehicleIcon} />

            <View handleCloseRouteView={handleCloseRouteView} selectedVehicle={selectedVehicle} />
        </>
    );
}

export default RouteView;
