import React from 'react';
import './Messages.scss';
import { Message } from '../Message/Message';

export function Messages(props) {
    return (
        <div className='messages'>
            {
                props.messages.map(message => {
                    return (
                        <Message 
                            message={message.message} 
                            time={message.time} 
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