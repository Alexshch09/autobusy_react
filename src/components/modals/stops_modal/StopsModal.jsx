import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import StopsHeader from './header/Stops_header';
import StopsBody from './body/Stops_body';
import StopsFooter from './footer/Stops_footer';

function StopsModal({ show, onHide, selectedStop }) {
  const [loadingDepartures, setLoadingDepartures] = useState(false);
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    if (selectedStop) {
      fetchDepartures(selectedStop.number);
    }
  }, [selectedStop]);

  const fetchDepartures = async (stopNumber) => {
    setLoadingDepartures(true);
    const response = await fetch(`https://www.zditm.szczecin.pl/api/v1/displays/${stopNumber}`);
    const data = await response.json();
    setDepartures(data.departures);
    setLoadingDepartures(false);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <StopsHeader selectedStop={selectedStop} />
      <Modal.Body>
        <StopsBody selectedStop={selectedStop} loadingDepartures={loadingDepartures} departures={departures} />
      </Modal.Body>
      <StopsFooter handleClose={onHide} />
    </Modal>
  );
}

export default StopsModal;
