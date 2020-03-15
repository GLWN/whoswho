import React, { Component } from 'react';
import Header from './Header';
import FaceWrapper from './FaceWrapper';
import Dashboard from './Dashboard';
import './App.css';
import './stroll.css';

class App extends Component {
  render() {
    return(
      <div className="app">
        <Header />
        <div className="content">
          <FaceWrapper />
          <Dashboard />
        </div>
      </div>
    )
  }
}

export default App;