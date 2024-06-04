import React from 'react';
import Button from 'react-bootstrap/Button';


function BusButton(number) {
    return (
        <Button variant="primary" className='mx-2'>${number}</Button>
    );
}

export default BusButton;
