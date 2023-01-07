import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export function PageHome() {

    const navigate = useNavigate()


    const loginSet = () => {
        try { 
            let token = 'login';
            let ls = localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')) : [];
            console.log(token);
            ls.push(token)
            localStorage.setItem('login', JSON.stringify(ls));
        } catch (error) {
            console.log(error);
        }
    }

    loginSet();

    useEffect(() => {
        navigate('/') // eslint-disable-next-line
    }, [])
}