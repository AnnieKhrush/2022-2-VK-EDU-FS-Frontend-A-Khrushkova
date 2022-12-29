import React from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GeneralPage, History } from './pages';

class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<GeneralPage />} />
          <Route path='/history' element={<History />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default App;