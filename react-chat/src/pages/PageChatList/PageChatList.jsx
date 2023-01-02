import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './PageChatList.scss';
//import mycat from '../../photos/mycat.jpg';
import { Button } from '../../components';
import { ChatHead } from '../../components';
import { Chats } from '../../components';
import { HeadName } from '../../components';


export async function allowNotification() {
    try {
        await Notification.requestPermission();
    } catch (error) {
        return false;
    }
    return true;
}


export function PageChatList(props) {


    const [chatsEarlier, setChatsEarlier] = useState([]);
    const [generalEarlier, setGeneralEarlier] = useState({});
    const [chats, setChats] = useState([]);
    const [lastgmessage, setLastgmessage] = useState({})


    const style = {
        fontSize: '28px'
    }

    
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
                message.timestamp = getTimeFromISOString(message.timestamp);
                setLastgmessage(message);  
            })
        }

        setChatsEarlier(chats);
        setGeneralEarlier(lastgmessage);
        const time = setInterval(() => pollItems(), 1000);
        return () => clearInterval(time);
    }, [chats, lastgmessage]);

  
    useEffect(() => {
        if (allowNotification()) {
            console.log(lastgmessage);
            console.log(chatsEarlier);
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (chats[i].last_message.owner !== 'me')) {
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
    }, [chats, chatsEarlier, generalEarlier, lastgmessage])


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
            <Chats chats={chats} last_gen_mes={lastgmessage} />
            <div className='create_chat'>
                <EditIcon style={style} />
            </div>
        </div>
    )
}
