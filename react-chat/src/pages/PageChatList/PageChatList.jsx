import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
//import AttachmentIcon from '@mui/icons-material/Attachment';
import './PageChatList.scss';
import mycat from '../../photos/mycat.jpg';
import polina from '../../photos/polina.jpg';
import photonics from '../../photos/photonics.jpg';
import kittens from '../../photos/kittens.jpg';
import {Button} from '../../components';
import {ChatHead} from '../../components';
import {Chat} from '../../components';


export function PageChatList(props) {

    const style = {
        fontSize: '28px'
    }

    return (
        <div className='chats_list'>
            <ChatHead>
                <Button name={'menu'} onClick={() => {}}>
                    <MenuIcon style={style}/>
                </Button>
                <div className='app_name'>
                    Messenger
                </div>
                <Button name={'search'} onClick={() => {}}>
                    <SearchIcon style={style}/>
                </Button>
            </ChatHead>
            <div className='chats'>
                <Chat photo={mycat} name={'Персик'} last_message={'мяяяяяяяяяяяяяяяяя'} time={'06:35'} status={'read'} onClick={() => {props.Change('PageChat')}} />
                <Chat photo={polina} name={'Полина'} last_message={'Привет, ты как?'} time={'15:15'} status={'unread'} />
                <Chat photo={photonics} name={'Чат группы'} last_message={'ну что, где все? на сколько все опоздают??'} time={'15:10'} status={'unread_many'} number={'99'} />
                <Chat photo={kittens} name={'Котята'} last_message={'У меня котенок мяукает уже час, это норм?'} time={'15:05'} status={'mentioned'} number={'@ 199'} />
            </div>
            <Button name={'create_chat'} onClick={() => {}}>
                <EditIcon style={style} />
            </Button>
        </div>
    )
}
