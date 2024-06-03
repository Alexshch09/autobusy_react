import React from 'react';
import { Modal } from 'react-bootstrap';

function SettingsHeader({ handleClose }) {
  return (
    <Modal.Header closeButton>
      <Modal.Title>Настройки</Modal.Title>
    </Modal.Header>
  );
}

export default SettingsHeader;
