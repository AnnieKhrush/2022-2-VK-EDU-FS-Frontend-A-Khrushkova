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
import { getChats, getGmessages } from '../../actions';


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
    //const lastgmessage = props.gmessages.at(-1);
    console.log(props.gmessages);

    useEffect(() => {
        const pollItems = () => {
            props.getChats();
            props.getGMessages();
        }

        setChatsEarlier(props.chats);
        setGeneralEarlier(props.gmessages.at(-1));
        const time = setInterval(() => pollItems(), 1000);
        return () => clearInterval(time);
    }, [props]);

  
    useEffect(() => {
        if (allowNotification()) {
//            console.log(props.lastgmessage);
//            console.log(chatsEarlier);
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((props.chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (props.chats[i].last_message.owner !== 'me')) {
                    let notification = new Notification(`New message from '${props.chats[i].chat_title}'`,{
                        body: `${props.chats[i].last_message.owner}: ${props.chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            if ((props.gmessages.at(-1).id > generalEarlier.id) && (props.gmessages.at(-1).author !== 'Anya')) {
                let notification = new Notification(`New message from 'Общий чат'`,{
                    body: `${props.gmessages.at(-1).author}: ${props.gmessages.at(-1).text}`,
                });
                notification.close();
            }
            setChatsEarlier(props.chats);
            setGeneralEarlier(props.gmessages.at(-1));
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
            <Chats chats={props.chats} last_gen_mes={props.gmessages.at(-1)} />
            <div className='create_chat'>
                <EditIcon style={style} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    chats: state.chats.chats,
    gmessages: state.gmessages.gmessages,
});


export const PageChatListConnect = connect(mapStateToProps, { getChats, getGmessages } )(PageChatList);
