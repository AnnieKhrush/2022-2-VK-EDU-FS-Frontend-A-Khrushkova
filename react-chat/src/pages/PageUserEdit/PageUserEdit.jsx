import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import './PageUserEdit.scss';
import mycat from '../../photos/mycat.jpg';
import { ChatHead } from '../../components';
import { HeadName } from '../../components';
import { Button } from '../../components';
import { EditProfileForm } from '../../components';


export function PageUserEdit(props) {


    const style = {
        fontSize: '28px'
    }

    const cameraStyle = {
        fontSize: '48px'
    }

    return (
        <div className='user_edit'>
            <ChatHead>
                <Link to='/chat/1'>
                    <Button>
                        <ArrowBackIcon style={style}/>
                    </Button>
                </Link>
                <HeadName name={'Edit Profile'} />
                <Button>
                    <DoneIcon style={style} />
                </Button>
            </ChatHead>
            <div className='profile_edit_body'>
                <div className='user_photo_edit'>
                    <img src={mycat} alt="Фото пользователя" />
                    <CameraAltIcon className='camera' style={cameraStyle} />
                </div>
                <EditProfileForm user_photo={mycat} form_name={'full_name'} input_name={'full-name-input'} name={"full_name"} value={'Персик'} place={"Full Name"} />
                <EditProfileForm form_name={'username'} input_name={'username-input'} name={"username"} value={'@the_best_cat'} place={"Username"} info={'Minimum lenght is 5 characters'} />
                <EditProfileForm form_name={'bio'} input_name={'bio-input'} name={"bio"} value={'Котик'} place={"Bio"} info={'Any details about you'} />
            </div>
        </div>
    )

}