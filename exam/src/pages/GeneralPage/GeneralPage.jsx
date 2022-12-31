import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
//import { Button } from '../../components';
import './GeneralPage.scss';
import HistoryIcon from '@mui/icons-material/History';
import SyncAltIcon from '@mui/icons-material/SyncAlt';



export function GeneralPage(props) {


    const [value, setValue] = useState('');
    const [translation, setTranslation] = useState('');
    const [listLang, setListLang] = useState([]);
    const [allInfoLang, setAllInfoLang] = useState({});
    const [finalLang, setFinalLang] = useState('ru');
    const [initLang, setInitLang] = useState('');
    const [selectedLangFrom, setSelectedLangFrom] = useState('');
    const [selectedLangTo, setSelectedLangTo] = useState('');
    


    const style = {
        fontSize: '36px'
    }

    const arrowStyle = {
        fontSize: '16px'
    }


    function ListLanguages() {
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
                .then(response => {
                    console.log(response);
                    let dict = response.dictionary;
                    setAllInfoLang(dict);
                    console.log(allInfoLang);
                    const keys = Object.keys(dict);
                    let langs = [];
                    keys.forEach(function(key) {
                        langs.push(dict[key].name)
                    });
                    setListLang(langs);
                    console.log(listLang);
                })
                .catch(err => console.error(err));
    }

    useEffect(() => {
        ListLanguages();
        }, []);



    function translateText() {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': 'df5ffa97f3mshfa5277882376ad1p1db7b7jsnb69ba524116a',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
            body: `[{"Text":"${value}"}]`
        };
        
        fetch(`https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${finalLang}&api-version=3.0&from=${initLang}&profanityAction=NoAction&textType=plain`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setTranslation(response[0].translations[0].text);
                let newTranslation = {
                    'from': initLang,
                    'to': response[0].translations[0].to,
                    'initial': value,
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
            translateText();
        }
        setValue('');
    }


    function handleChange(event) {
        setValue(event.target.value);
    }


    function handleChangeFromLang(event) {
        setSelectedLangFrom(event.target.value);
        //console.log(event.target.value);
        const keys = Object.keys(allInfoLang);
        keys.forEach(function(key) {
            if (allInfoLang[key].name === event.target.value) {
                setInitLang(key);
                //console.log(initLang);
            }
        });

    }

    function handleChangeToLang(event) {
        setSelectedLangTo(event.target.value);
        //console.log(event.target.value);
        const keys = Object.keys(allInfoLang);
        keys.forEach(function(key) {
            if (allInfoLang[key].name === event.target.value) {
                setFinalLang(key);
                //console.log(finalLang);
            }
        });

    }


    function Languages(props) {
        if (props.class === 'init_lang') {
            return(
                <select className={props.class} value={selectedLangFrom} onChange={handleChangeFromLang}>  
                    {
                    listLang.map((lang) => {
                        return(
                            <option>
                                {lang}
                            </option>
                        )
                    })
                    }
                </select>
            )
        } else if (props.class === 'final_lang') {
            return(
                <select className={props.class} value={selectedLangTo} onChange={handleChangeToLang}>  
                    {
                    listLang.map((lang) => {
                        return(
                            <option>
                                {lang}
                            </option>
                        )
                    })
                    }
                </select>
            )
        }

        
    }



    return (
        <div className='general_page'>
            <Header name={'Translate'} />
            <div className='translate_field'>
                <div className='languages'>
                    <Languages class={'init_lang'} />
                    <div className='switch'>
                        <SyncAltIcon style={arrowStyle} />
                    </div>
                    <Languages class={'final_lang'} />
                </div>
                <div className='form'>
                    <div className='form-input'>
                        <form action="/" onSubmit={handleSubmit}>
                            <input value={value} name='for_translation' placeholder='For translation' type='text' onChange={handleChange}/>
                        </form>
                    </div>
                    <div className='form-output'>
                        <div className='output'>
                            {translation}
                        </div>
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

