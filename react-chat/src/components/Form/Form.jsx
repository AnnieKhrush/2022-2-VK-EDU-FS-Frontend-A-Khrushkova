import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Form.scss';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MyLocationIcon from '@mui/icons-material/MyLocation';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

export function Form(props) {

    const [value, setValue] = useState('');
    const [image, setImage] = useState('');
    const [audio, setAudio] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [recorder, setRecorder] = useState(null);
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [dragIsActive, setDragIsActive] = useState(false);


    const style = {
        fontSize: '28px'
    }

    const params = useParams();
    //console.log(params);


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
        if (image !== '') {
            const dataImage = new FormData();
            //console.log(image);
            dataImage.append('image', image);
            fetch('https://tt-front.vercel.app/upload', {
                method: 'POST',
                body: dataImage,
            })
            .then((response) => {console.log(response); return response.json();})
            .then(d => {console.log(d["imgSrc"]); newMessage(d["imgSrc"] + '\n' + value)})

        } else if (value !== '' && image === '') {
            newMessage(value);
        } else if (audio !== '') {
            const dataAudio = new FormData();
            //console.log(audio);
            dataAudio.append('audio', audio);
            fetch('https://tt-front.vercel.app/upload', {
                method: 'POST',
                body: dataAudio,
            })
            .then((response) => {console.log(response); return response.json();})
            .then(d => {console.log(d["audioSrc"]); newMessage(d["audioSrc"] + '\n' + value)})

            //setAudioSrc('');
        }
        setAudioSrc('');
        setAudio('');
        setValue('');
        setImageSrc('');
        setImage('');
    }


    function handleChange(event) {
        setValue(event.target.value);
    }


    function handleChangeImage(event) {
        setImage(event.target.files[0]);
        setImageSrc(URL.createObjectURL(event.target.files[0]));

        //console.log(image)
    }


    function handleDrag(event) {
        event.preventDefault();
        if (event.type === 'dragover' || event.type === 'dragenter') {
            setDragIsActive(true)
        } else {
            setDragIsActive(false)
        }
    }


    function handleDrop(event) {
        event.preventDefault();
        setImage(event.dataTransfer.files[0]);
        setImageSrc(URL.createObjectURL(event.dataTransfer.files[0]));
        setDragIsActive(false);
    }


    async function getAudio() {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream);
    }


    useEffect(() => {
        if (recorder === null ) {
            if (recordingStarted) {
                getAudio().then(setRecorder, console.error());
            }
            return;
        }

        if (recordingStarted) {
            recorder.start();
        } else {
            recorder.stop();
        }

        recorder.addEventListener("dataavailable", (event) => {setAudio(event.data); setAudioSrc(URL.createObjectURL(event.data))});
        return () => recorder.removeEventListener("dataavailable", (event) => {setAudioSrc(URL.createObjectURL(event.data))});
    }, [recorder, recordingStarted])


    function handleAudioStart(event) {
        //event.preventDefault();
        //setAudio(event.data);
        //setAudioSrc(URL.createObjectURL(event.data));
        setRecordingStarted(true);
    }


    function handleAudioStop(event) {
        //event.preventDefault();
        setRecordingStarted(false);
        //setAudio('');
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


    function Start() {
        return(
            <div onClick={handleAudioStart}>
                <MicIcon style={ style } />
            </div>
        )
    }


    function Stop() {
        return(
            <div onClick={handleAudioStop}>
                <StopIcon style={ style } />
            </div>
        )
    }

    
    return (
        <div className='form_preview'>
            <div className='preview'>
                {image && <img className="downloaded_image" src={imageSrc} alt='pic' />}
                {audio && <audio controls className="downloaded_audio" src={audioSrc} alt='audio' />}
                {(image || audio) && <div className='cancel' onClick={() => { setImage(''); setImageSrc(''); setAudio(''); setAudioSrc('');}} > <CancelPresentationIcon style={ style } /> </div>}
            </div>
            <div className={dragIsActive ? 'drag' : 'form'} onDragEnter={ handleDrag } onDragOver={ handleDrag } onDragLeave={ handleDrag } onDrop={ handleDrop } >
                <form action="/" onSubmit={ handleSubmit } >
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
                            <div className={recordingStarted ? 'stop_micro' : 'micro'} >
                                {recordingStarted ? Stop() : Start() }
                            </div>
                        </div>
                        <div className='geo_field'>
                            <div className='geo' >
                                <div onClick={handleLocationSubmit}>
                                    <MyLocationIcon style={ style } />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
    
}
