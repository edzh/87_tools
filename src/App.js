import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Postcare from './components/Postcare';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path={'/postcare'} render={() => <Postcare />} />
        </div>
      </Router>
    );
  }
}

export default App;
