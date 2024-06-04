import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Settings from './Settings/Settings';
import Choose from './Choose/Choose';

function SettingsBody() {
  return (
    <Accordion>

      <Choose />

      <Settings />

    </Accordion>
  );
}

export default SettingsBody;
