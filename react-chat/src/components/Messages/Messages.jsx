import React from 'react';
import './Messages.scss';
import { Message } from '../Message/Message';

export function Messages(props) {


    return (
        <div className='messages'>
            {
                props.messages.map((message, index) => {
                    function getTimeFromISOString(timestamp) {
                        return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                      }
                    return (
                        <Message
                            key={index} 
                            message={message.message} 
                            time={getTimeFromISOString(message.message_created_at)} 
                            owner={message.owner}
                            check={message.check} 
                        />
                    )
                    }
                )
            }
        </div>
    )
}