import React from 'react'
import { Navigate} from 'react-router-dom'

export function PrivateRoute(props) {


    const checkLogin = () => {
        let ls = localStorage.getItem('login');
        console.log(ls)
        if (!ls || ls === []) {
            return true;
        } else {
          return false
        }
      }
  
    let a = checkLogin();
    console.log(a);

    return !checkLogin() ? ( props.component ) : (<Navigate to={{ pathname: '/login'}} />)
}