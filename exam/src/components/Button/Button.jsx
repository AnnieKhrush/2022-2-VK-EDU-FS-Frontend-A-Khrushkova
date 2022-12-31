import React from 'react';
import  './Button.scss';

export function Button(props) {
    return(
        <div className='button'>
            {props.button}
        </div>
    );
}