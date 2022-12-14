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


export function PageChatGeneral(props) {

    const style = {
        fontSize: '28px'
    }

    const [messages, setMessages] = useState([]);


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
    }


    useEffect(() => {
        const time = setInterval(() => pollItems(), 500);
        return () => clearInterval(time);
      }, []);


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
