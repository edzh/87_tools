import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WithAuth from './containers/WithAuthContainer';
import Routes from './components/Route/Routes';

import Navbar from './containers/NavbarContainer';
import UserContainer from './containers/UserContainer';

class App extends Component {
  render() {
    return (
      <UserContainer>
        <Router>
          <div style={{ fontFamily: 'sans-serif' }}>
            <Navbar />
            <Routes />
          </div>
        </Router>
      </UserContainer>
    );
  }
}

export default App;
