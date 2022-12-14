import React from 'react';
import './Message.scss';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

export function Message(props) {

    const style = {
        fontSize: '16px'
    }

    function Status () {
        if (props.check === true) {
            return (
                <div className='message_check'>
                    <DoneAllIcon style={style}/>
                </div>
            )
        } else {
            return (
                <div className='message_check'>
                    <DoneIcon style={style}/>
                </div>
            )
        }
    }
 
    if (props.owner === 'me' || props.owner === 'Anya') {
        return (
            <div className='my_message'>
                <div className='author'>
                    {props.owner}
                </div>
                <div className='content_of_message'>
                    {props.message}
                </div>
                <div className='time_and_check'>
                    <div className='time_of_message'>
                        {props.time}
                    </div>
                    <Status />
                </div>
            </div>
        )
    } else {
        return (
            <div className='opponent_message'>
                <div className='author'>
                    {props.owner}
                </div>
                <div className='content_of_message'>
                    {props.message}
                </div>
                <div className='time_of_message'>
                    {props.time}
                </div>
            </div>
        )
    }
}
