import React, { useState } from 'react';
import './EditProfileForm.scss';

export function EditProfileForm(props) {

    const [value, setValue] = useState(props.fill_field)

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleChange(event) {


        if (props.input_name === 'full-name-input') {
            setValue(event.target.value);
        } else if (props.input_name === 'username-input') {
            setValue(event.target.value);
        } else if (props.input_name === 'bio-input') {
            setValue(event.target.value);
        }   
    }

    return (
        <div className='info_field'>
            <form className={props.form_name} action="/" onSubmit={handleSubmit}>
                <div className='input_field'>
                    <div className='field_title'>
                        {props.place}
                    </div>
                    <input className={props.input_name} value={value} name={props.name} placeholder={props.place} type="text" onChange={handleChange}/>
                </div>
            </form>
            <div className='details'>
                {props.info}
            </div>
        </div>
    )
}