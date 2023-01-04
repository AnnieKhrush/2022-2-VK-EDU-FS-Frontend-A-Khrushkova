import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageChatConnect } from './pages';
import { PageChatListConnect } from './pages';
import { PageUserEdit } from './pages';
import { PageChatGeneral } from './pages/PageChatGeneral';


class App extends React.Component {


  render() {

    return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<PageChatListConnect />} />
          <Route path='/chat/:id' element={<PageChatConnect />} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/chat/general' element={<PageChatGeneral/>} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/user/edit/:id' element={<PageUserEdit />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default App;

//      <PageUserEdit />
//      <this.state.page Change={(page) => {this.handleChange(page)}} />