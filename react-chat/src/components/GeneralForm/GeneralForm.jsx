import React, { useState } from 'react';
import './GeneralForm.scss';
import AttachmentIcon from '@mui/icons-material/Attachment';

export function GeneralForm(props) {

    const [value, setValue] = useState('')

    const style = {
        fontSize: '28px'
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (value === '') {
            return;
        } else {
            let newMessage = {
                text: value,
                author: 'Anya'
            };
            fetch('https://tt-front.vercel.app/message', {
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
