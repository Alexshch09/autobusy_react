import React from 'react';
import { Marker } from 'react-leaflet';

function VehicleMarker({ selectedVehicle, createVehicleIcon }) {
    return (
        <Marker
            position={[selectedVehicle.latitude, selectedVehicle.longitude]}
            icon={createVehicleIcon(selectedVehicle.line_number, selectedVehicle.vehicle_type === 'tram' ? 'purple' : 'blue')}
        />
    );
}

export default VehicleMarker;
