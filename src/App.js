import React, { useState, useEffect } from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './components/map/Map';
import SettingsModal from './components/modals/settings_modal/SettingsModal';
import StopsModal from './components/modals/stops_modal/StopsModal';
import './App.css';

function App() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStopModal, setShowStopModal] = useState(false);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
    setTimeout(() => {
      setShowStopModal(true);
    }, 120);
  };

  const handleCloseSettings = () => setShowSettingsModal(false);
  const handleCloseStop = () => setShowStopModal(false);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container style={{ height: '4vh' }}>
          <Navbar.Brand href="#">Лого</Navbar.Brand>
          <Button variant="outline-light" onClick={() => setShowSettingsModal(true)}>Настройки</Button>
        </Container>
      </Navbar>
      <Map onStopClick={handleStopClick} />
      <SettingsModal show={showSettingsModal} onHide={handleCloseSettings} />
      <StopsModal show={showStopModal} onHide={handleCloseStop} selectedStop={selectedStop} />
    </div>
  );
}

export default App;
