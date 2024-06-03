import React from 'react';
import { Marker } from 'react-leaflet';

function StopsView({mapZoom ,focusedStops, createStopIcon, onStopClick}) {
    return (
        <>
            {mapZoom >= 16 && focusedStops.map(stop => (
                <Marker
                    key={stop.id}
                    position={[stop.latitude, stop.longitude]}
                    icon={createStopIcon('red')}
                    eventHandlers={{
                        click: () => onStopClick(stop),
                    }}
                >
                </Marker>
            ))}
        </>
    );
}

export default StopsView;
