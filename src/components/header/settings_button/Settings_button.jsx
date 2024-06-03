import React from 'react';
import { Button } from 'react-bootstrap';

function SettingsButton({ onClick }) {
  return (
    <Button variant="outline-light" onClick={onClick}>Настройки</Button>
  );
}

export default SettingsButton;
