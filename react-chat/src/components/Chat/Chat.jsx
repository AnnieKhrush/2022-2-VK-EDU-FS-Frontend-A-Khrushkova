import React from 'react';
import './Chat.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

export function Chat(props) {

    const style = {
        fontSize: '20px'
    }

    function ChatStatus() {
        if (props.status === 'unread') {
            return (
                <div className={props.status}>
                    <DoneIcon style={style}/>
                </div>
            )
        } else if (props.status === 'read') {
            return (
                <div className={props.status}>
                    <DoneAllIcon style={style}/>
                </div>
            )
        } else if (props.status === 'mentioned') {
            return (
                <div className={props.status}>
                    {props.number}
                </div>
            )            
        } else if (props.status === 'unread_many') {
            return (
                <div className={props.status}>
                    {props.number}
                </div>
            )
        }
    }


    return (
        <div className='chat' onClick={props.onClick}>
            <div className='chat_photo'>
                <img src={props.photo} alt="Фото чата" />
            </div>
            <div className='chat_info'>
                <div className='chat_info_text'>
                    <div className='chat_name'>
                        {props.name}
                    </div>
                    <div className='last_message'>
                        {props.last_message}
                    </div>
                </div>
                <div className='time_and_status'>
                    <div className='message_time'>
                        {props.time}
                    </div>
                    <div className='chat_status'>
                        <ChatStatus />
                    </div>
                </div>
            </div>
        </div>
    )
}