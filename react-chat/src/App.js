import React from 'react'
import {PageChat} from './pages/PageChat';
import {PageChatList} from './pages/PageChatList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PageChat,
    };
  }

  handleChange(page) {
    if (page === 'PageChatList') {
      this.setState({page: PageChatList});
    } else {
      this.setState({page: PageChat});
    }
  }

  render() {
    return (
      <this.state.page Change={(page) => {this.handleChange(page)}} />
    )
  }
}

export default App;