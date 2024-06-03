import React from 'react';
import { Button } from 'react-bootstrap';

function SettingsFooter({ handleClose }) {
  return (
    <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
  );
}

export default SettingsFooter;
