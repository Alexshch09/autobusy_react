import React from 'react';

function RouteInfo({ selectedVehicle }) {
    return (
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
            <h5>Информация по маршруту</h5>
            <p>Линия: {selectedVehicle.line_number}</p>
            <p>Направление: {selectedVehicle.direction}</p>
            <p>Текущая скорость: {selectedVehicle.velocity} км/ч</p>
            <p>Пунктуальность: {selectedVehicle.punctuality} мин</p>
        </div>
    );
}

export default RouteInfo;
