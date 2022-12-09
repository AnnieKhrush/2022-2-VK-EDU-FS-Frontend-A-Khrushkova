import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PageChat } from './pages/PageChat';
import { PageChatList } from './pages/PageChatList';
import { PageUserEdit } from './pages/PageUserEdit';


class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path='/chats' element={<PageChatList />} />
          <Route path='/chat/1' element={<PageChat />} style={{backgroundColor: '#F8F8F8'}} />
          <Route path='/user/edit' element={<PageUserEdit />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default App;

//      <PageUserEdit />
//      <this.state.page Change={(page) => {this.handleChange(page)}} />