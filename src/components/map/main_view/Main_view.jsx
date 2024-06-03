import React from 'react';
import {Marker} from 'react-leaflet';

function MainView({ vehicles, handleVehicleClick, createVehicleIcon }) {
  return (
    <>
      {vehicles.map(vehicle => (
        <Marker
          key={vehicle.vehicle_id}
          position={[vehicle.latitude, vehicle.longitude]}
          icon={createVehicleIcon(vehicle.line_number, vehicle.vehicle_type === 'tram' ? 'purple' : 'blue')}
          eventHandlers={{
            click: () => handleVehicleClick(vehicle)
          }}
        >
        </Marker>
      ))}
    </>
  );
}

export default MainView;
