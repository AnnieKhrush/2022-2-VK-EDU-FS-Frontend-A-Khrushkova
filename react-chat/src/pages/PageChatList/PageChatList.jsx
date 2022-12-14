import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './PageChatList.scss';
import mycat from '../../photos/mycat.jpg';
import { Button } from '../../components';
import { ChatHead } from '../../components';
import { Chat } from '../../components';
import { HeadName } from '../../components';


export function PageChatList(props) {

    const style = {
        fontSize: '28px'
    }


    function Chats() {

        let [chats, setChats] = useState([]);
        let [lastgmessage, setLastgmessage] = useState({})


        function getTimeFromISOString(timestamp) {
            return new Date(timestamp).toLocaleTimeString('ru', { timeStyle: 'short', hour12: false, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
          }

        useEffect(() => {
            const pollItems = () => {
                fetch('/chats/list/1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    setChats(data);
                })
    
                fetch('https://tt-front.vercel.app/messages', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => response.json())
                .then(data => {
                    let message = data.at(-1);
                    message.timestamp = getTimeFromISOString(message.timestamp);
                    setLastgmessage(message);
                })
            }
            const time = setInterval(() => pollItems(), 1000);
            return () => clearInterval(time);
        }, []);


        return (
            <div className='chats'>
                <Chat name={'Общий чат'} type={'general'} photo={mycat} last_message={lastgmessage.text} owner={lastgmessage.author} time={lastgmessage.timestamp}/>
                {
                    chats.map((chat, index) => {
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
                    })      
                }
            </div>
        )
    }



    return (
        <div className='chats_list'>
            <ChatHead>
                <Button>
                    <MenuIcon style={style}/>
                </Button>
                <HeadName name={'Messenger'} />
                <Button>
                    <SearchIcon style={style}/>
                </Button>
            </ChatHead>
            <Chats />
            <div className='create_chat'>
                <EditIcon style={style} />
            </div>
        </div>
    )
}
