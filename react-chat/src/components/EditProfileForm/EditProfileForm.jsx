import React from 'react';
import './EditProfileForm.scss';

export function EditProfileForm(props) {

    return (
        <div className='info_field'>
            <form className={props.form_name} action="/">
                <div className='input_field'>
                    <div className='field_title'>
                        {props.place}
                    </div>
                    <input className={props.input_name} value={props.value} name={props.name} placeholder={props.place} type="text"/>
                </div>
            </form>
            <div className='details'>
                {props.info}
            </div>
        </div>
    )
}