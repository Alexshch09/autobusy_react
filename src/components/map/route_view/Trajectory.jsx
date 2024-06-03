import React from 'react';
import { Polyline } from 'react-leaflet';

function Trajectory({ trajectories, selectedVehicle }) {
    return (
        <Polyline
            positions={
                trajectories[selectedVehicle.line_id].features
                    .filter(feature => feature.properties.route_variant_number === selectedVehicle.route_variant_number)
                    .flatMap(feature => feature.geometry.coordinates.map(coord => [coord[1], coord[0]]))
            }
            color="green"
            weight={6}
        />
    );
}

export default Trajectory;
