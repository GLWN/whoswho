import React, { Component } from 'react';
import Header from './Header';
import FaceWrapper from './FaceWrapper';
import Dashboard from './Dashboard';
import './App.scss';

// IMG PRELOAD
// https://stackoverflow.com/questions/42615556/how-to-preload-images-in-react-js
import im1 from './img/face_0-0.jpg'
import im2 from './img/face_0-1.jpg'
import im3 from './img/face_0-2.jpg'
import im4 from './img/face_1-0.jpg'
import im5 from './img/face_1-1.jpg'
import im6 from './img/face_1-2.jpg'
import im7 from './img/face_2-0.jpg'
import im8 from './img/face_2-1.jpg'
import im9 from './img/face_2-2.jpg'
import im10 from './img/face_3-0.jpg'
import im11 from './img/face_3-1.jpg'
import im12 from './img/face_3-2.jpg'
import im13 from './img/face_4-0.jpg'
import im14 from './img/face_4-1.jpg'
import im15 from './img/face_4-2.jpg'
import im16 from './img/face_5-0.jpg'
import im17 from './img/face_5-1.jpg'
import im18 from './img/face_5-2.jpg'

// OR

// componentDidMount() {
//   this.props.pictures.forEach((picture) => {
//       const img = new Image();
//       img.src = picture.fileName;
//   });
// }

class App extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const imageList = [im1, im2, im3, im4, im5, im6, im7, im8, im9, im10, im11, im12, im13, im14, im15, im16, im17, im18];
    imageList.forEach((image) => {
        new Image().src = image
    });
    let el = document.getElementsByClassName('content')[0];
    setTimeout(() => {
      
      el.classList.add('anim-intro');
    }, 100);
  }
  render() {
    // this.animIntro = "content anim-intro";
    
    return(
      // <div className="valign-wrapper">
      // <div className="valign">
      <div>
        <Header />
        <div className="content">
          <FaceWrapper />
          <Dashboard />
        </div>
      </div>
      // </div>
      // </div>
    )
  }
}

export default App;