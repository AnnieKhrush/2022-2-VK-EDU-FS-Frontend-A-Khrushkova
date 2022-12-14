import React from 'react';
import './GeneralMessages.scss';
import { Message } from '../Message/Message';

export function GeneralMessages(props) {
        
    return (
        <div className='messages'>
            {
                props.messages.map((message, index) => {
                    function getTimeFromISOString(timestamp) {
                        return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                    }
                    return(
                        <Message
                            key={index}
                            message={message.text} 
                            time={getTimeFromISOString(message.timestamp)} 
                            owner={message.author}
                        />
                    )
                }
                )
            }
        </div>
    )               
}