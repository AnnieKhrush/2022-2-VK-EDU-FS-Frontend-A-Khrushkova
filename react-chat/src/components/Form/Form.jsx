import React, { useState } from 'react';
import './Form.scss';
import AttachmentIcon from '@mui/icons-material/Attachment';

export function Form(props) {

    const [value, setValue] = useState('')

    const style = {
        fontSize: '28px'
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (value === '') {
            return;
        } else {
            let now = new Date();
            let newMessage = {
                'message': value,
                'time': ((now.getHours())+':'+ (now.getMinutes())),
                'owner': 'me',
                'check': true
            };
            let messagesStorage = localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
            messagesStorage.push(newMessage)
            localStorage.setItem("db_messages" , JSON.stringify(messagesStorage));
        }
        setValue('');
        props.getMessages();
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <form className='form' action="/" onSubmit={handleSubmit}>
            <div className='text_field'>
                <input className='form-input' value={value} name="message-text" placeholder="Сообщение" type="text" onChange={handleChange}/>
                <div className='attach'>
                    <AttachmentIcon style={ style } />
                </div>
            </div>
        </form>
    )
    
}
