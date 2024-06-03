import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Basic from './Basic/Basic';
import Customization from './Customization/Customization';
import Devs from './Devs/Devs';

function Settings() {
    return (

        <Accordion.Item eventKey="1">
            <Accordion.Header>Настройки</Accordion.Header>

            <Accordion.Body>
                <Accordion>

                    <Basic />

                    <Customization />

                    <Devs />

                </Accordion>
            </Accordion.Body>

        </Accordion.Item>

    );
}

export default Settings;
