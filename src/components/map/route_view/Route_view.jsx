import React from 'react';
import { Polyline, Marker } from 'react-leaflet';
import { Button } from 'react-bootstrap';

function RouteView({ selectedVehicle, trajectories, createVehicleIcon, handleCloseRouteView }) {
  return (
    <>
      <Polyline
        positions={
          trajectories[selectedVehicle.line_id].features
            .filter(feature => feature.properties.route_variant_number === selectedVehicle.route_variant_number)
            .flatMap(feature => feature.geometry.coordinates.map(coord => [coord[1], coord[0]]))
        }
        color="green"
        weight={6}
      />
      <Marker
        position={[selectedVehicle.latitude, selectedVehicle.longitude]}
        icon={createVehicleIcon(selectedVehicle.line_number, selectedVehicle.vehicle_type === 'tram' ? 'purple' : 'blue')}
      >
      </Marker>
      <Button
        variant="danger"
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}
        onClick={handleCloseRouteView}
      >
        Закрыть режим просмотра
      </Button>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
        <h5>Информация по маршруту</h5>
        <p>Линия: {selectedVehicle.line_number}</p>
        <p>Направление: {selectedVehicle.direction}</p>
        <p>Текущая скорость: {selectedVehicle.velocity} км/ч</p>
        <p>Пунктуальность: {selectedVehicle.punctuality} мин</p>
      </div>
    </>
  );
}

export default RouteView;
