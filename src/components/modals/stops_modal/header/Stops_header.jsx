import React from 'react';
import { Modal } from 'react-bootstrap';

function StopsHeader({ selectedStop }) {
  return (
    <Modal.Header closeButton>
      <Modal.Title>{selectedStop ? selectedStop.name : 'Остановка'}</Modal.Title>
    </Modal.Header>
  );
}

export default StopsHeader;
