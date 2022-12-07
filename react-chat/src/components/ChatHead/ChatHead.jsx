import React from 'react';
import './ChatHead.scss';

export function ChatHead(props) {
    return (
        <nav className='chat_head'>
            {props.children}
        </nav>
    )
}
