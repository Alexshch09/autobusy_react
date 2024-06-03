import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Settings from './Settings/Settings';

function SettingsBody() {
  return (
    <Accordion>

      <Accordion.Item eventKey="0">
        <Accordion.Header>Выбор Автобусов</Accordion.Header>

        <Accordion.Body>

        </Accordion.Body>

      </Accordion.Item>

      <Settings />

    </Accordion>
  );
}

export default SettingsBody;
