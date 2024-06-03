// src/api/icons.js
import L from 'leaflet';

export const createVehicleIcon = (lineNumber, color) => {
  const iconHtml = `
    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="13" fill="${color}" stroke="black" stroke-width="1"/>
      <text x="15" y="20" font-size="12" font-family="Arial" fill="white" text-anchor="middle">${lineNumber}</text>
    </svg>
  `;
  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

export const createStopIcon = () => {
  const iconHtml = `
    <img width="30" height="30" src="https://img.icons8.com/fluency/30/bus-stop.png" alt="bus-stop"/>
  `;
  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};
