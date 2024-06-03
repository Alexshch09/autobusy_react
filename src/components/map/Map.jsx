import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapEvent } from 'react-leaflet';
import MainView from './main_view/Main_view';
import RouteView from './route_view/Route_view';
import StopsView from './main_view/Stops_view';
import { createVehicleIcon, createStopIcon } from '../icons/icons';
import { fetchVehicles, fetchStops, fetchTrajectory } from '../../api/api';

const Map = ({ onStopClick }) => {
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState([]);
  const [focusedStops, setFocusedStops] = useState([]);
  const [mapZoom, setMapZoom] = useState(13);
  const [trajectories, setTrajectories] = useState({});
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [routeViewMode, setRouteViewMode] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetchVehicles(setVehicles);
    fetchStops(setStops);
    const interval = setInterval(() => fetchVehicles(setVehicles), 10000);
    return () => clearInterval(interval);
  }, []);


  const handleVehicleClick = async (vehicle) => {
    if (!trajectories[vehicle.line_id]) {
      await fetchTrajectory(vehicle.line_id, setTrajectories);
    }
    setSelectedVehicle(vehicle);
    setRouteViewMode(true);
  };

  const handleCloseRouteView = () => {
    setRouteViewMode(false);
    setSelectedVehicle(null);
  };

  const MapEvents = () => {
    const map = useMapEvent('moveend', () => {
      const bounds = map.getBounds();
      const zoom = map.getZoom();
      setMapZoom(zoom);
      const inBoundsStops = stops.filter(stop => bounds.contains([stop.latitude, stop.longitude]));
      setFocusedStops(inBoundsStops);
    });

    return null;
  };

  return (
    <MapContainer center={[53.4282798767, 14.5524597168]} zoom={13} maxZoom={19} style={{ height: '94vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />

      <StopsView
        mapZoom={mapZoom}
        focusedStops={focusedStops}
        createStopIcon={createStopIcon}
        onStopClick={onStopClick}>
      </StopsView>

      {!routeViewMode && (
        <MainView
          vehicles={vehicles}
          handleVehicleClick={handleVehicleClick}
          createVehicleIcon={createVehicleIcon}>
        </MainView>
      )}

      {routeViewMode && selectedVehicle && trajectories[selectedVehicle.line_id] && (
        <RouteView
          selectedVehicle={selectedVehicle}
          trajectories={trajectories}
          createVehicleIcon={createVehicleIcon}
          handleCloseRouteView={handleCloseRouteView}>
        </RouteView>
      )}
      <MapEvents />
    </MapContainer>
  );
}

export default Map;
