// src/api/api.js
export const fetchVehicles = async (setVehicles) => {
  const response = await fetch('https://www.zditm.szczecin.pl/api/v1/vehicles');
  const data = await response.json();
  setVehicles(data.data);
};

export const fetchStops = async (setStops) => {
  const response = await fetch('https://www.zditm.szczecin.pl/api/v1/stops');
  const data = await response.json();
  setStops(data.data);
};

export const fetchTrajectory = async (lineId, setTrajectories) => {
  const response = await fetch(`https://www.zditm.szczecin.pl/api/v1/trajectories/${lineId}`);
  const data = await response.json();
  setTrajectories(prevState => ({ ...prevState, [lineId]: data }));
};

export const fetchLines = async (setLines) => {
  const response = await fetch('https://www.zditm.szczecin.pl/api/v1/lines');
  const data = await response.json();
  setLines(data);
}