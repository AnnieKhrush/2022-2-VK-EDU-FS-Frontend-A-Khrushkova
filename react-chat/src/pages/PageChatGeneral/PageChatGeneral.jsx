import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './PageChatGeneral.scss';
import mycat from '../../photos/mycat.jpg';
import { Button } from '../../components';
import { ChatHead } from '../../components';
import { UserAccount } from '../../components';
import { GeneralForm } from '../../components';
import { GeneralMessages } from '../../components';
import { allowNotification } from '../PageChatList/PageChatList';


export function PageChatGeneral(props) {

    const style = {
        fontSize: '28px'
    }

    const [messages, setMessages] = useState([]);
    const [chatsEarlier, setChatsEarlier] = useState([]);
    const [chats, setChats] = useState([]);


    const pollItems = () => {
    
        fetch('https://tt-front.vercel.app/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setMessages(data);
            console.log(data);
        })

        fetch('/chats/list/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setChats(data))
    }


    useEffect(() => {
        setChatsEarlier(chats);
        const time = setInterval(() => pollItems(), 500);
        return () => clearInterval(time);
    }, [chats]);


    useEffect(() => {
        if (allowNotification()) {
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (chats[i].last_message.owner !== 'me')) {
                    let notification = new Notification(`New message from '${chats[i].chat_title}'`,{
                        body: `${chats[i].last_message.owner}: ${chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            setChatsEarlier(chats);
        }
    }, [chats, chatsEarlier])


    return (
        <div className='chat_content'>
            <ChatHead>
                <Link to='/'>
                    <Button>
                        <ArrowBackIcon style={style}/>
                    </Button>
                </Link>
                <Link to='/user/edit' className='link_user'>
                    <UserAccount
                        user_photo={mycat}
                        username={'Общий чат'}
                        last_visit={'Был 2 часа назад'}
                    />
                </Link>
                <Button>
                    <SearchIcon style={style}/>
                </Button>
                <Button>
                    <MoreVertIcon style={style}/>
                </Button>
            </ChatHead>
            <GeneralMessages messages={messages} />
            <GeneralForm  />
        </div>
    )
}
