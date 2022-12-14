import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Form.scss';
import AttachmentIcon from '@mui/icons-material/Attachment';

export function Form(props) {

    const [value, setValue] = useState('')

    const style = {
        fontSize: '28px'
    }

    const params = useParams();
    console.log(params);

    function handleSubmit(event) {
        event.preventDefault();
        if (value === '') {
            return;
        } else {
            let newMessage = {
                message: value,
                message_in_chat: params.id
            };
            fetch('/chats/message/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            })
            .then(response => {response.json(); console.log(response)})
            .then(newMessage => console.log(newMessage))
        }
        setValue('');
        
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


//let messagesStorage = localStorage.getItem("db_messages") ? JSON.parse(localStorage.getItem("db_messages")) : [];
//messagesStorage.push(newMessage)
//localStorage.setItem("db_messages" , JSON.stringify(messagesStorage));
//props.getMessages();