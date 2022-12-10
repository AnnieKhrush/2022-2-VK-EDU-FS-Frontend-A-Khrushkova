import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import './PageChatList.scss';
import mycat from '../../photos/mycat.jpg';
import polina from '../../photos/polina.jpg';
import photonics from '../../photos/photonics.jpg';
import kittens from '../../photos/kittens.jpg';
import { Button } from '../../components';
import { ChatHead } from '../../components';
import { Chat } from '../../components';
import { HeadName } from '../../components';


export function PageChatList(props) {

    const style = {
        fontSize: '28px'
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
            <div className='chats'>
                <Link to={'/chat/1'} className='link_chat' >
                    <Chat photo={mycat} name={'Персик'} last_message={'мяяяяяяяяяяяяяяяяя'} time={'06:35'} status={'read'} />
                </Link>
                <Link to={'/chat/2'} className='link_chat' >
                    <Chat photo={polina} name={'Полина'} last_message={'Привет, ты как?'} time={'15:15'} status={'unread'} />
                </Link>
                <Link to={'/chat/3'} className='link_chat' >
                    <Chat photo={photonics} name={'Чат группы'} last_message={'ну что, где все? на сколько все опоздают??'} time={'15:10'} status={'unread_many'} number={'99'} />
                </Link>
                <Link to={'/chat/4'} className='link_chat' >
                    <Chat photo={kittens} name={'Котята'} last_message={'У меня котенок мяукает уже час, это норм?'} time={'15:05'} status={'mentioned'} number={'@ 199'} />
                </Link>
            </div>
            <div className='create_chat'>
                <EditIcon style={style} />
            </div>
        </div>
    )
}
