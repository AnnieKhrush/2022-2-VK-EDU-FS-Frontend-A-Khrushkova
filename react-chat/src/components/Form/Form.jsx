import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Form.scss';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MyLocationIcon from '@mui/icons-material/MyLocation';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import MicIcon from '@mui/icons-material/Mic';
//import StopIcon from '@mui/icons-material/Stop';

export function Form(props) {

    const [value, setValue] = useState('')
    const [image, setImage] = useState('')
    const [audio, setAudio] = useState('')
    const [imageSrc, setImageSrc] = useState('')

    

    const style = {
        fontSize: '28px'
    }

    const params = useParams();
    console.log(params);

    function newMessage(text) {
        let newMessage = {
            message: text,
            message_in_chat: params.id
        };
        fetch('/chats/message/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        })
        .then(response => { console.log(response); return response.json(); })
        .then(newMessage => console.log(newMessage))
    }


    function handleSubmit(event) {
        event.preventDefault();
        if (value === '' && image !== '') {
            const data = new FormData();
            //console.log(image);
            data.append('image', image);
            fetch('https://tt-front.vercel.app/upload', {
                method: 'POST',
                body: data,
            })
            .then((response) => {console.log(response); return response.json();})
            .then(d => {console.log(d["imgSrc"]); newMessage(d["imgSrc"])})

        } else if (value !== '' && image === '') {
            newMessage(value);
        } else if (value !== '' && image !== '') {
            //return;
        } else {
            return;
        }

        setValue('');
        setImage('');
    }


    function handleChange(event) {
        setValue(event.target.value);
    }


    function handleChangeImage(event) {
        setImage(event.target.files[0]);
        setImageSrc(URL.createObjectURL(event.target.files[0]));

        URL.revokeObjectURL(event.target.files[0]);

        //console.log(image)
    }


    function handleLocationSubmit(event) {
        function success(position) {
            let latitude  = position.coords.latitude;
            let longitude = position.coords.longitude;
            console.log(latitude, longitude);
            newMessage(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        }
        
        function error() {
            alert("Can't find you!");
        }

        event.preventDefault();
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }


    
    return (
        <div className='form_preview'>
            <div className='images_preview'>
                {(image) && <img className="downloaded_image" src={imageSrc} alt='pic' />}
            </div>
            <div className='form'>
                <div className='form_text'>
                    <form action="/" onSubmit={ handleSubmit }>
                        <div className='form_messages'>
                            <div className='text_field'>
                                <input className='form-input' value={value} name="message-text" placeholder="Сообщение" type="text" onChange={handleChange}/>
                            </div>
                            <div className='attach_field'>
                                <div className='attach'>
                                    <label>
                                        <AttachmentIcon style={ style } />
                                        <input hidden id='form-image' accept="image/*" type="file" name='message-image' onChange={ handleChangeImage } /> 
                                    </label>
                                </div>
                            </div>
                            <div className='micro_field'>
                                <button className='micro' type="submit">
                                    <MicIcon style={ style } />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='form_geo'>
                    <form action="/" onSubmit={ handleLocationSubmit }>
                        <div className='geo_field'>
                            <button className='geo' type="submit">
                                <MyLocationIcon style={ style } />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}
