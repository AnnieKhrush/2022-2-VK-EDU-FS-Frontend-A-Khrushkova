import React from 'react';
import { Link } from 'react-router-dom';
import './Chat.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';


export function Chat(props) {

    const style = {
        fontSize: '20px',
        color: '#8E24AA'
    }

    function ChatStatus() {
        if (props.status === false) {
            return (
                <div className={props.unread}>
                    <DoneIcon style={style}/>
                </div>
            )
        } else if (props.status === true) {
            return (
                <div className={props.read}>
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


    function ChatType() {
        if (props.type === 'general') {
            let url=`/chat/general`; 
            return url
        } else {
            let url=`/chat/${props.id}`; 
            return url
        }
    }

    return (
        <div>
            <Link to={ChatType()} className='link_chat' >
                <div className='chat'>
                    <div className='chat_photo'>
                        <img src={props.photo} alt="Фото чата" />
                    </div>
                    <div className='chat_info'>
                        <div className='chat_info_text'>
                            <div className='chat_name'>
                                {props.name}
                            </div>
                            <div className='last_message'>
                                {props.owner}:  {props.last_message}
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
            </Link>
        </div>
    )
}