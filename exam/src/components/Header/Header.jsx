import React from 'react';
import './Header.scss';

export function Header(props) {
    return (
        <div className='head'>
            {props.name}
        </div>
    )
}