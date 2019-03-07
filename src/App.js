import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import PinLookup from './containers/PinLookup';
import AddStudent from './components/Student/AddStudent';
import Timesheet from './containers/Timesheet';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{ fontFamily: ['Roboto', 'sans-serif'] }}>
          <Navbar />
          <Route exact path={'/pinlookup'} render={() => <PinLookup />} />
          <Route exact path={'/addstudent'} render={() => <AddStudent />} />
          <Route exact path={'/timesheet/'} render={() => <Timesheet />} />
        </div>
      </Router>
    );
  }
}

export default App;
