import React from 'react';
import CloseButton from './view/CloseButton';
import RouteInfo from './view/RouteInfo';

function RouteView({ handleCloseRouteView, selectedVehicle}) {
    return (
        <>
            <CloseButton handleCloseRouteView={handleCloseRouteView} />
            <RouteInfo selectedVehicle={selectedVehicle} />
        </>
    );
}

export default RouteView;
