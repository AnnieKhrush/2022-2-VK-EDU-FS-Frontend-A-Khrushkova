import React from 'react';
import './PageAuth.scss';
import GoogleIcon from '@mui/icons-material/Google';


export function PageAuth(props) {


    const style = {
        fontSize: '24px'
    }
   

    return (
        <div className='page_auth'>
            <div className='auth'>
                <div className='app_name'>
                    Messenger
                </div>
                <a href='http://localhost:8000/social-auth/login/google-oauth2/' className='google'>
                    <div className='google_icon'>
                        <GoogleIcon style={style} />
                    </div>
                    <div className='google_text'>
                        LOGIN WITH GOOGLE
                    </div>
                </a>
            </div>
        </div>
    )
}