import React from 'react';
import { Button } from 'react-bootstrap';

function CloseButton({ handleCloseRouteView }) {
    return (
        <Button
            variant="danger"
            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}
            onClick={handleCloseRouteView}
        >
            Закрыть режим просмотра
        </Button>
    );
}

export default CloseButton;
