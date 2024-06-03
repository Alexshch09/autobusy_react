import React from 'react';
import { Spinner } from 'react-bootstrap';

function StopsBody({ selectedStop, loadingDepartures, departures }) {
  if (loadingDepartures) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Линия</th>
          <th>Направление</th>
          <th>Время до отправления</th>
        </tr>
      </thead>
      <tbody>
        {departures.map((departure, index) => (
          <tr key={index}>
            <td>{departure.line_number}</td>
            <td>{departure.direction}</td>
            <td>{departure.time_real !== null ? `${departure.time_real} мин.` : departure.time_scheduled}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StopsBody;
