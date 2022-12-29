import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import './GeneralPage.scss';
import HistoryIcon from '@mui/icons-material/History';

//function ListLanguages() {
//    let res = '';
//    const options = {
//        method: 'GET',
//        headers: {
//            'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
//            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
//            'x-rapidapi-ua': 'RapidAPI-Playground'
//        }
//    };
    
//    fetch('https://microsoft-translator-text.p.rapidapi.com/languages?api-version=3.0', options)
//        .then(response => {res = response.json();})
//        .then(response => console.log(response))
//        .catch(err => {console.error(err); return(err);});

//    return(res)
    
//}

export function GeneralPage(props) {


    const [value, setValue] = useState('');
    //const [isOpen, setOpen] = useState(false);
    const [translation, setTranslation] = useState('');


    const style = {
        fontSize: '36px'
    }


//    function Languages() {
//        const languages = ListLanguages()
//        console.log(languages)
//        return (
//            {
//                languages.map((language) => {
//                    return (
//                        <div className='lang'>
//                            {language}
//                        </div>
//                   )
//                    })
//            }
//            )
//            
//    }


    function translateText(finalLang) {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            body: '[{"Text":"hello"}]'
        };
        
        fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${finalLang}&api-version=3.0&profanityAction=NoAction&textType=plain`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setTranslation(response[0].translations[0].text);
                let newTranslation = {
                    'from': response[0].detectedLanguage.language,
                    'to': response[0].translations[0].to,
                    'initial': "hello",
                    'final': response[0].translations[0].text,
                }
                let translationsStorage = localStorage.getItem("db_translations") ? JSON.parse(localStorage.getItem("db_translations")) : [];
                translationsStorage.push(newTranslation)
                localStorage.setItem("db_translations" , JSON.stringify(translationsStorage));
            })
            .catch(err => console.error(err));
    }


    
    function handleSubmit(event) {
        event.preventDefault();
        if (value === '') {
            return;
        } else {
            translateText('ru');
        }
        setValue('');
    }


    function handleChange(event) {
        setValue(event.target.value);
    }


//    const handleOpen = () => setOpen(true);

    return (
        <div className='general_page'>
            <Header name={'Translate'} />
            <div className='translate_field'>
                <div className='languages'>
                    
                </div>
                <div className='form'>
                    <div className='form-input'>
                        <form action="/" onSubmit={handleSubmit}>
                            <input value={value} name='for_translation' placeholder='For translation' type='text' onChange={handleChange}/>
                        </form>
                    </div>
                    <div className='form-output'>
                        {translation}
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

//<input onClick={handleOpen} type='button' />
//                        {
//                            isOpen && (<Languages className='select_languages'/>)
//                        }