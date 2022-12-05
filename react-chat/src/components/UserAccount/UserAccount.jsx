import React from 'react';
import './UserAccount.scss';
export function UserAccount(props) {
    return (
        <div className='user_account'>
            <div className='user_photo'>
                <img src={props.user_photo} alt="Фото пользователя" />
            </div>
            <div className='user_info'>
                <div className='user_name'>
                    {props.username}
                </div>
                <div className='user_last_visit'>
                    {props.last_visit}
                </div>
            </div>
        </div>
    )
}
