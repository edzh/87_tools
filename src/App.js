import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import PinLookup from './components/PinLookup';
import AddStudent from './components/Student/AddStudent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ fontFamily: ['Roboto', 'sans-serif'] }}>
          <Navbar />
          <Route exact path={'/pinlookup'} render={() => <PinLookup />} />
          <Route exact path={'/addstudent'} render={() => <AddStudent />} />
        </div>
      </Router>
    );
  }
}

export default App;
