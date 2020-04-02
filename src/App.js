import React, { Component } from 'react'
import FaceWrapper from './FaceWrapper'
import Dashboard from './Dashboard'
import Loader from './components/Loader'
import './App.scss'
import prefetchImages from 'prefetch-image'
import ReactDOM from 'react-dom'
import conf from './conf'

class App extends Component {
  constructor() {
    super();
    
    this.state = { 
      areAssetsLoaded: false,
      animCssIntroDuration: 2000
    };
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
    const content = document.getElementsByClassName('content')[0];

    prefetchImages(this.facesImgUrlList)
    .then(() => {
      content.classList.add('anim-intro');
      setTimeout(() => {
        this.setState({
          areAssetsLoaded: true
        })
      }, this.state.animCssIntroDuration);
    });  
  }

  render() {   
    return(
      <div>
        {!this.state.areAssetsLoaded && <Loader />}
        <div className="content">
          <FaceWrapper />
          <Dashboard />
        </div>
      </div>
    )
  }
}

export default App;