import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import { getChats, getGmessages } from '../../actions';


export function PageChatGeneral(props) {

    const style = {
        fontSize: '28px'
    }

//    const [messages, setMessages] = useState([]);
    const [chatsEarlier, setChatsEarlier] = useState([]);


    const pollItems = () => {   
        props.getGmessages();
        props.getChats();
    }


    useEffect(() => {
        setChatsEarlier(props.chats);
        const time = setInterval(() => pollItems(), 500);
        return () => clearInterval(time); // eslint-disable-next-line
    }, [props]);


    useEffect(() => {
        if (allowNotification()) {
            for (let i = 0; i < chatsEarlier.length; i++) {
                if ((props.chats[i].chat_messages.length > chatsEarlier[i].chat_messages.length) && (props.chats[i].last_message.owner !== 'me')) {
                    let notification = new Notification(`New message from '${props.chats[i].chat_title}'`,{
                        body: `${props.chats[i].last_message.owner}: ${props.chats[i].last_message.message}`,
                    });
                    notification.close();
                }
            }
            setChatsEarlier(props.chats);
        }
    }, [props, chatsEarlier])


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
            <GeneralMessages messages={props.messages} />
            <GeneralForm  />
        </div>
    )
}


const mapStateToProps = (state) => ({
    chats: state.chats.chats,
    messages: state.general_messages.general_messages,
});


export const PageChatGeneralConnect = connect(mapStateToProps, { getChats, getGmessages } )(PageChatGeneral);
