import React, { Component } from 'react'
import FaceWrapper from './FaceWrapper'
import Dashboard from './Dashboard'
import './App.scss'
import prefetchImages from 'prefetch-image'
import conf from './conf'

class App extends Component {
  constructor() {
    super();

    this.facesImgUrlList = [];

    for (let i = 0; i < conf.facesTotal; i++) {
      let imgUrl = './img/face_' + i + '-';
      for (let j = 0; j < 3; j++) {
        const imgFullUrl = imgUrl + j + '.jpg';
        this.facesImgUrlList.push(imgFullUrl);
      }
    }
  }
  
  componentDidMount() {
    const el = document.getElementsByClassName('content')[0];
    
    prefetchImages(this.facesImgUrlList)
    .then(() => {
      //start init your page logic...
      console.log('all images loaded!');
      el.classList.add('anim-intro');
    });  
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