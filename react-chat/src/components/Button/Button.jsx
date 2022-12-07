import React from 'react';
import  './Button.scss';

export function Button(props) {
    return(
        <div className={props.name} onClick={props.onClick}>
            {props.children}
        </div>
    );
}
