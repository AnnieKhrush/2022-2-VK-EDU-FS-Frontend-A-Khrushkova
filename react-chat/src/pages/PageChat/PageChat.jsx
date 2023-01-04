import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './PageChat.scss';
import mycat from '../../photos/mycat.jpg';
import { Button, ChatHead, UserAccount, Form, Messages } from '../../components';
import { allowNotification } from '../PageChatList/PageChatList';
import { getMessages, getChats, getLastGmessage } from '../../actions';


export function PageChat(props) {

    const params = useParams();
    console.log(params);


    const [info, setInfo] = useState('');
    const [chatsEarlier, setChatsEarlier] = useState([]);
    const [generalEarlier, setGeneralEarlier] = useState({});
//    const [chats, setChats] = useState([]);
//    const [lastgmessage, setLastgmessage] = useState({})


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
            props.getMessages(params.id);
            props.getChats();
            props.getLastGmessage();
        }

        setChatsEarlier(props.chats);
        setGeneralEarlier(props.lastgmessage);
        const time = setInterval(() => pollItems(), 500);
        return () => clearInterval(time);
    }, [params.id, props]);


    useEffect(() => {
        if (allowNotification()) {
//            console.log(props.lastgmessage);
            console.log(chatsEarlier);
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((props.chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (props.chats[i].last_message.owner !== 'me') && (props.chats[i].id !== Number(params.id))) {
                    let notification = new Notification(`New message from '${props.chats[i].chat_title}'`,{
                        body: `${props.chats[i].last_message.owner}: ${props.chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            if ((props.lastgmessage._id > generalEarlier._id) && (props.lastgmessage.author !== 'Anya')) {
                let notification = new Notification(`New message from 'Общий чат'`,{
                    body: `${props.lastgmessage.author}: ${props.lastgmessage.text}`,
                });
                notification.close();
            }
            setChatsEarlier(props.chats);
            setGeneralEarlier(props.lastgmessage);
        }
    }, [chatsEarlier, generalEarlier, params.id, props])

    //console.log('gmess', props.messages);
    //console.log('chats:', props.chats);



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
            <Messages messages={props.messages}/>
            <Form  />
        </div>
    )
}


const mapStateToProps = (state) => ({
    messages: state.messages.messages,
    chats: state.chats.chats,
    lastgmessage: state.lastgmessage.lastgmessage,
});


export const PageChatConnect = connect(mapStateToProps, { getMessages, getChats, getLastGmessage } )(PageChat);
