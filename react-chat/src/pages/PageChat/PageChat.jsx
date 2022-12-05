import React, {useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import AttachmentIcon from '@mui/icons-material/Attachment';
import './PageChat.scss';
import mycat from '../../photos/mycat.jpg';
import {Button} from '../../components';
import {ChatHead} from '../../components';
import {UserAccount} from '../../components';
import {Form} from '../../components';
import {Messages} from '../../components';


export function PageChat(props) {

    const [messages, setMessages] = useState(() => {const begin_state=localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
    return begin_state;})

    function getMessages() {
        const get_messages = localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
        setMessages(get_messages)
    }

    const style = {
        fontSize: '28px'
    }

    return (
        <div className='chat_content'>
            <ChatHead>
                <Button name={'arrow_button'} onClick={() => {props.Change('PageChatList')}}>
                    <ArrowBackIcon style={style}/>
                </Button>
                <UserAccount
                    user_photo={mycat} 
                    username={'Персик'} 
                    last_visit={'Был 2 часа назад'}
                />
                <Button name={'search'} onClick={() => {}}>
                    <SearchIcon style={style}/>
                </Button>
                <Button name='more_features' onClick={() => {}}>
                    <MoreVertIcon style={style}/>
                </Button>
            </ChatHead>
            <Messages messages={messages}/>
            <Form getMessages={getMessages}/>
        </div>
    )
}
