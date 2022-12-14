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


export function PageChat(props) {

    const params = useParams();
    console.log(params);

    const [messages, setMessages] = useState([])
    const [info, setInfo] = useState('')


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
        }
        const time = setInterval(() => pollItems(), 1000);
        return () => clearInterval(time);
      }, []);


    const style = {
        fontSize: '28px'
    }


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


//const [messages, setMessages] = useState(() => {const begin_state=localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
//    return begin_state;})

//    function getMessages() {
//        const get_messages = localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
//        setMessages(get_messages)
//    }