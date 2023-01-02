import React, {useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './PageChat.scss';
import mycat from '../../photos/mycat.jpg';
import {Button} from '../../components';
import {ChatHead} from '../../components';
import {UserAccount} from '../../components';
import {Form} from '../../components';
import {Messages} from '../../components';
import { allowNotification } from '../PageChatList/PageChatList';


export function PageChat(props) {

    const params = useParams();
    console.log(params);

    const [messages, setMessages] = useState([]);
    const [info, setInfo] = useState('');
    const [chatsEarlier, setChatsEarlier] = useState([]);
    const [generalEarlier, setGeneralEarlier] = useState({});
    const [chats, setChats] = useState([]);
    const [lastgmessage, setLastgmessage] = useState({})


    const style = {
        fontSize: '28px'
    }


    useEffect(() => {
        fetch(`/chats/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            setInfo(data);
        })
    }, [params.id])


    useEffect(() => {
        const pollItems = () => {

            fetch(`/chats/message/list/${params.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => setMessages(data.reverse()))

            fetch('/chats/list/1', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => setChats(data))
    
            fetch('https://tt-front.vercel.app/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                let message = data.at(-1);
                setLastgmessage(message);  
            })
        }

        setChatsEarlier(chats);
        setGeneralEarlier(lastgmessage);
        const time = setInterval(() => pollItems(), 500);
        return () => clearInterval(time);
    }, [chats, lastgmessage, params.id]);


    useEffect(() => {
        if (allowNotification()) {
            console.log(lastgmessage);
            console.log(chatsEarlier);
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (chats[i].last_message.owner !== 'me') && (chats[i].id !== Number(params.id))) {
                    let notification = new Notification(`New message from '${chats[i].chat_title}'`,{
                        body: `${chats[i].last_message.owner}: ${chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            if ((lastgmessage.id > generalEarlier.id) && (lastgmessage.author !== 'Anya')) {
                let notification = new Notification(`New message from 'Общий чат'`,{
                    body: `${lastgmessage.author}: ${lastgmessage.text}`,
                });
                notification.close();
            }
            setChatsEarlier(chats);
            setGeneralEarlier(lastgmessage);
        }
    }, [chats, chatsEarlier, generalEarlier, lastgmessage, params.id])


    return (
        <div className='chat_content'>
            <ChatHead>
                <Link to='/'>
                    <Button>
                        <ArrowBackIcon style={style}/>
                    </Button>
                </Link>
                <Link to={`/user/edit/${params.id}`} className='link_user'>
                    <UserAccount
                        user_photo={mycat}
                        username={info.chat_title}
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
            <Messages messages={messages}/>
            <Form  />
        </div>
    )
}
