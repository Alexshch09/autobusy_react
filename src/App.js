import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import { Modal, Button, Navbar, Container, Spinner } from 'react-bootstrap';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState([]);
  const [focusedStops, setFocusedStops] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);
  const [departures, setDepartures] = useState([]);
  const [mapZoom, setMapZoom] = useState(13);
  const [trajectories, setTrajectories] = useState({});
  const [hoveredVehicle, setHoveredVehicle] = useState(null);
  const [loadingDepartures, setLoadingDepartures] = useState(false);
  const [routeViewMode, setRouteViewMode] = useState(false); // New state for route view mode
  const [selectedVehicle, setSelectedVehicle] = useState(null); // New state for selected vehicle

  useEffect(() => {
    fetchVehicles();
    fetchStops();
    const interval = setInterval(fetchVehicles, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedStop) {
      fetchDepartures(selectedStop.number);
    }
  }, [selectedStop]);

  const fetchVehicles = async () => {
    const response = await fetch('https://www.zditm.szczecin.pl/api/v1/vehicles');
    const data = await response.json();
    setVehicles(data.data);
  };

  const fetchStops = async () => {
    const response = await fetch('https://www.zditm.szczecin.pl/api/v1/stops');
    const data = await response.json();
    setStops(data.data);
  };

  const fetchDepartures = async (stopNumber) => {
    setLoadingDepartures(true);
    const response = await fetch(`https://www.zditm.szczecin.pl/api/v1/displays/${stopNumber}`);
    const data = await response.json();
    setDepartures(data.departures);
    setLoadingDepartures(false);
  };

  const fetchTrajectory = async (lineId) => {
    const response = await fetch(`https://www.zditm.szczecin.pl/api/v1/trajectories/${lineId}`);
    const data = await response.json();
    setTrajectories(prevState => ({ ...prevState, [lineId]: data }));
  };

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
    setTimeout(() => {
      setShowStopModal(true);
    }, 70);
  };

  const handleCloseSettings = () => setShowSettingsModal(false);
  const handleCloseStop = () => setShowStopModal(false);

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

  const createVehicleIcon = (lineNumber, color) => {
    const iconHtml = `
      <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="13" fill="${color}" stroke="black" stroke-width="1"/>
        <text x="15" y="20" font-size="12" font-family="Arial" fill="white" text-anchor="middle">${lineNumber}</text>
      </svg>
    `;
    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };

  const createStopIcon = (color) => {
    const iconHtml = `
    <img width="30" height="30" src="https://img.icons8.com/fluency/30/bus-stop.png" alt="bus-stop"/>
    `;
    return L.divIcon({
      html: iconHtml,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -15]
    });
  };

  const handleVehicleClick = async (vehicle) => {
    if (!trajectories[vehicle.line_id]) {
      await fetchTrajectory(vehicle.line_id);
    }
    setSelectedVehicle(vehicle);
    setRouteViewMode(true);
  };

  const handleMouseOver = async (vehicle) => {
    if (!trajectories[vehicle.line_id]) {
      await fetchTrajectory(vehicle.line_id);
    }
    setHoveredVehicle(vehicle);
  };

  const handleMouseOut = () => {
    setHoveredVehicle(null);
  };

  const handleCloseRouteView = () => {
    setRouteViewMode(false);
    setSelectedVehicle(null);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container style={{height:'4vh'}}>
          <Navbar.Brand href="#">Лого</Navbar.Brand>
          <Button variant="outline-light" onClick={() => setShowSettingsModal(true)}>Настройки</Button>
        </Container>
      </Navbar>
      <MapContainer center={[53.4282798767, 14.5524597168]} zoom={13} maxZoom={19} style={{ height: '94vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        {!routeViewMode && vehicles.map(vehicle => (
          <Marker
            key={vehicle.vehicle_id}
            position={[vehicle.latitude, vehicle.longitude]}
            icon={createVehicleIcon(vehicle.line_number, vehicle.vehicle_type === 'tram' ? 'purple' : 'blue')}
            eventHandlers={{
              click: () => handleVehicleClick(vehicle),
              mouseover: () => handleMouseOver(vehicle),
              mouseout: () => handleMouseOut()
            }}
          >
          </Marker>
        ))}
        {mapZoom >= 16 && focusedStops.map(stop => (
          <Marker
            key={stop.id}
            position={[stop.latitude, stop.longitude]}
            icon={createStopIcon('red')}
            eventHandlers={{
              click: () => handleStopClick(stop),
            }}
          >
          </Marker>
        ))}
        {routeViewMode && selectedVehicle && trajectories[selectedVehicle.line_id] && (
          <>
            <Polyline
              positions={
                trajectories[selectedVehicle.line_id].features
                  .filter(feature => feature.properties.route_variant_number === selectedVehicle.route_variant_number)
                  .flatMap(feature => feature.geometry.coordinates.map(coord => [coord[1], coord[0]]))
              }
              color="green"
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
              {/* Add more route-specific information here */}
            </div>
          </>
        )}
        <MapEvents />
      </MapContainer>

      <Modal show={showSettingsModal} onHide={handleCloseSettings}>
        <Modal.Header closeButton>
          <Modal.Title>Настройки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Здесь будут настройки приложения</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSettings}>Закрыть</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showStopModal} onHide={handleCloseStop}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStop ? selectedStop.name : 'Остановка'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStop && (
            loadingDepartures ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" />
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Линия</th>
                    <th>Направление</th>
                    <th>Время до отправления</th>
                  </tr>
                </thead>
                <tbody>
                  {departures.map((departure, index) => (
                    <tr key={index}>
                      <td>{departure.line_number}</td>
                      <td>{departure.direction}</td>
                      <td>{departure.time_real !== null ? `${departure.time_real} мин.` : departure.time_scheduled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStop}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
