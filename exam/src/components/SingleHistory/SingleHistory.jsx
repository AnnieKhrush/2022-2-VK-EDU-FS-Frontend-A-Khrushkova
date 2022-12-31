import React from 'react';
import './SingleHistory.scss';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export function SingleHistory(props) {

    const style = {
        fontSize: '20px'
    }

    return (
        <div className='single_history'>
            <div className='from_to'>
                <div className='from'>
                    {props.from}
                </div>
                <ArrowForwardIcon className='arrow_to' style={style} />
                <div className='to'>
                    {props.to}
                </div>
            </div>
            <div className='texts'>
                <div className='initial'>
                    {props.initial}
                </div>
                <div className='final'>
                    {props.final}
                </div>
            </div>
        </div>
    )
}