import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BusButton from './Buttons/BusButton';
import Button from 'react-bootstrap/Button';

function Choose() {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        fetchLines(setLines);
    }, []);

    const fetchLines = async (setLines) => {
        const response = await fetch('https://www.zditm.szczecin.pl/api/v1/lines');
        const data = await response.json();
        setLines(data.data);
    }

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Выбор Автобусов</Accordion.Header>

            <Accordion.Body className='grid'>

                {lines.map((line, index) => (
                    <Button variant="primary" className='g-col-4 mx-1' key={index}>{line.number}</Button>
                ))}

            </Accordion.Body>

        </Accordion.Item>
    );
}

export default Choose;
