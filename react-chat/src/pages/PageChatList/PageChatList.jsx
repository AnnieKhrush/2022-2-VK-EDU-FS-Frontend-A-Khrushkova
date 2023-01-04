import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './PageChatList.scss';
//import mycat from '../../photos/mycat.jpg';
import { Button } from '../../components';
import { ChatHead } from '../../components';
import { Chats } from '../../components';
import { HeadName } from '../../components';
import { getChats, getLastGmessage } from '../../actions';


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
//    const [chats, setChats] = useState([]);
//    const [lastgmessage, setLastgmessage] = useState({})


    const style = {
        fontSize: '28px'
    }


    useEffect(() => {
        const pollItems = () => {
            props.getChats();
            props.getLastGmessage();
        }

        setChatsEarlier(props.chats);
        setGeneralEarlier(props.lastgmessage);
        const time = setInterval(() => pollItems(), 1000);
        return () => clearInterval(time);
    }, [props]);

  
    useEffect(() => {
        if (allowNotification()) {
            console.log('after', props.lastgmessage);
            console.log('before', generalEarlier);
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((props.chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (props.chats[i].last_message.owner !== 'me')) {
                    let notification = new Notification(`New message from '${props.chats[i].chat_title}'`,{
                        body: `${props.chats[i].last_message.owner}: ${props.chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            if ((props.lastgmessage._id > generalEarlier._id
                ) && (props.lastgmessage.author !== 'Anya')) {
                let notification = new Notification(`New message from 'Общий чат'`,{
                    body: `${props.lastgmessage.author}: ${props.lastgmessage.text}`,
                });
                notification.close();
            }
            setChatsEarlier(props.chats);
            setGeneralEarlier(props.lastgmessage);
        }
    }, [chatsEarlier, generalEarlier, props])


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
            <Chats chats={props.chats} last_gen_mes={props.lastgmessage} />
            <div className='create_chat'>
                <EditIcon style={style} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chats: state.chats.chats,
    lastgmessage: state.lastgmessage.lastgmessage,
});


export const PageChatListConnect = connect(mapStateToProps, { getChats, getLastGmessage } )(PageChatList);
