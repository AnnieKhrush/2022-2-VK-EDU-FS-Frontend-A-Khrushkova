import React from 'react';
import './Chats.scss';
import {Chat} from '../../components';
import mycat from '../../photos/mycat.jpg';

export function Chats(props) {

    
    return (
        <div className='chats'>
            <Chat name={'Общий чат'} type={'general'} photo={mycat} last_message={props.last_gen_mes.text} owner={props.last_gen_mes.author} time={props.last_gen_mes.timestamp}/>
            
            {
                props.chats ?
                    props.chats.map((chat, index) => {
                        function getTimeFromISOString(timestamp) {
                            return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
                        }
                        return (  
                            <Chat
                                type={'mine'}
                                key={index}
                                id={chat.id}
                                name={chat.chat_title}
                                photo={mycat} 
                                last_message={chat.last_message.message}
                                time={getTimeFromISOString(chat.last_message.message_created_at)}
                                status={chat.last_message.checked}
                                owner={chat.last_message.owner}
                            />
                        )
                    }) : <></>    
            }
        </div>
    ) 
   
}