import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PageChatConnect } from './pages';
import { PageChatListConnect } from './pages';
import { PageUserEdit } from './pages';
import { PageChatGeneralConnect } from './pages';
import { PageAuth } from './pages';
import { PageHome } from './pages';
import { PrivateRoute } from './components';


class App extends React.Component {
 

  render() {

    function LoginRoute(props) {

      const checkLogin = () => {
          let ls = localStorage.getItem('login');
          console.log(ls)
          if (!ls || ls === []) {
              return true;
          } else {
            return false
          }
        }
    
      return checkLogin() ? ( props.component ) : (<Navigate to={{ pathname: '/'}} />)
    }

    return (
      <HashRouter>
        <Routes>
          <Route path='/login' element={<LoginRoute component={<PageAuth />} />} style={{backgroundColor: '#8E24AA'}} />
          <Route path='/home_page' element={<PageHome />} style={{backgroundColor: '#8E24AA'}} />
          <Route path='/' element={<PrivateRoute component={<PageChatListConnect />}/>} />
          <Route path='/chat/:id' element={<PrivateRoute component={<PageChatConnect />} />} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/chat/general' element={<PrivateRoute component={<PageChatGeneralConnect />} />} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/user/edit/:id' element={<PrivateRoute component={<PageUserEdit />} />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default App;
