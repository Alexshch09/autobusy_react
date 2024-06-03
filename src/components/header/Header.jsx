import React from 'react';
import { Container, Button, Navbar } from 'react-bootstrap';

function Header({ setShowSettingsModal }) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container style={{ height: '4vh' }}>
                <Navbar.Brand href="#">Лого</Navbar.Brand>
                <Button variant="outline-light" onClick={() => setShowSettingsModal(true)}>Настройки</Button>
            </Container>
        </Navbar>
    );
}

export default Header;
