import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import './GeneralPage.scss';
import HistoryIcon from '@mui/icons-material/History';

export function GeneralPage(props) {


    const [value, setValue] = useState('')

    const style = {
        fontSize: '36px'
    }


    function translateText() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
                'x-rapidapi-ua': 'RapidAPI-Playground'
            }
        };
        
        fetch('https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }



    return (
        <div className='generalPage'>
            <Header name={'Translate'} />
            <div className='translate_field'>
                <div className='languages'>

                </div>
                <div className='form'>
                    <div className='form-input'>
                        <form>
                        <input value={value} name='for_translation' placeholder='For translation' type='text' />
                        </form>
                    </div>
                    <div className='form-output'>
                        helo
                    </div>
                </div>
            </div>
            <Link to='/history'>
                <div className='history'>
                    <div className='history_button'>
                        <HistoryIcon style={style}/>
                    </div>
                    <div className='history_word'>История</div>
                </div>
            </Link>
        </div>
    )
}