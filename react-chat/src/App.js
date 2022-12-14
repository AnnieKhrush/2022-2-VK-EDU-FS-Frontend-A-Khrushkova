import React from 'react';
import './App.css';
import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { PageChat } from './pages/PageChat';
import { PageChatList } from './pages';
import { PageUserEdit } from './pages';
import { PageChatGeneral } from './pages/PageChatGeneral';


class App extends React.Component {


  render() {

    return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<PageChatList />} />
          <Route path='/chat/:id' element={<PageChat />} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/chat/general' element={<PageChatGeneral/>} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/user/edit' element={<PageUserEdit />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default App;

//      <PageUserEdit />
//      <this.state.page Change={(page) => {this.handleChange(page)}} />