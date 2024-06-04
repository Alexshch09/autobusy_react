import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/Header';

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
    }, 140);
  };

  const handleCloseSettings = () => setShowSettingsModal(false);
  const handleCloseStop = () => setShowStopModal(false);

  return (
    <div>
      <Header setShowSettingsModal={setShowSettingsModal}/>
      <Map onStopClick={handleStopClick} />
      <SettingsModal show={showSettingsModal} onHide={handleCloseSettings} />
      <StopsModal show={showStopModal} onHide={handleCloseStop} selectedStop={selectedStop} />
    </div>
  );
}

export default App;
