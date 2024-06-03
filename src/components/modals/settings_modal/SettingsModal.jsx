import React from 'react';
import { Modal } from 'react-bootstrap';
import SettingsHeader from './header/Settings_header';
import SettingsBody from './body/Settings_body';
import SettingsFooter from './footer/Settings_footer';

function SettingsModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide}>
      <SettingsHeader />
      <Modal.Body>
        <SettingsBody />
      </Modal.Body>
      <SettingsFooter handleClose={onHide} />
    </Modal>
  );
}

export default SettingsModal;
