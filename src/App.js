import React, { Component } from 'react';
import FaceWrapper from './FaceWrapper';
import Dashboard from './Dashboard';
import './App.scss';

class App extends Component {
  componentDidMount() {
    const el = document.getElementsByClassName('content')[0];
    setTimeout(() => {
      el.classList.add('anim-intro');
    }, 100);
  }

  render() {    
    return(
      <div>
        <div className="content">
          <FaceWrapper />
          <Dashboard />
        </div>
      </div>
    )
  }
}

export default App;