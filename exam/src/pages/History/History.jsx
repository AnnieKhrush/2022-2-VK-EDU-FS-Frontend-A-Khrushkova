import React from 'react';
import './History.scss'
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export function History(props) {

    const style = {
        fontSize: '36px'
    }

    return(
        <div className='history_page'>
            <div className='history_head'>
                <div className='arrow_button'>
                    <Link to='/' >
                        <ArrowBackIcon className='arrow' style={ style }/>
                    </Link>
                </div>
                <Header name={'История'}/>
            </div>

        </div>
    )
}