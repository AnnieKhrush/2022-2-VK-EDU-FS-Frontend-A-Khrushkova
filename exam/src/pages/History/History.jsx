import React from 'react';
import './History.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import {SingleHistory} from '../../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export function History(props) {

    const translations = localStorage.getItem("db_translations") ? JSON.parse(localStorage.getItem("db_translations")) : [];

    const style = {
        fontSize: '36px'
    }

    return(
        <div className='history_page'>
            <div className='history_head'>
                <Link to='/' >
                    <div className='arrow_button'>
                        <ArrowBackIcon className='arrow' style={ style }/>
                    </div>
                </Link>
                <Header name={'История'}/>
            </div>
            <div className='translations_list'>
                <div className='clear' onClick = {() => {
                    localStorage.clear();
                }}>
                    Очистить историю
                </div>
                {
                translations.map((list) => {
                    return (
                        <SingleHistory
                            from={list.from} 
                            to={list.to} 
                            initial={list.initial}
                            final={list.final} 
                        />
                    )
                    }
                )
                }
            </div>
        </div>
    )
}