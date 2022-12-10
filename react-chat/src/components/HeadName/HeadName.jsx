import React from 'react';
import  './HeadName.scss';

export function HeadName(props) {
    return(
        <div className='head_name'>
            {props.name}
        </div>
    );
}
