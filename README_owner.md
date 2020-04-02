TODO :

optimize : unbind, destroy views... TODO

prio : 




test


add data persistance to store best scores


TODO :
async / promise / async/await
loading img dynamically (see below)
change logo btn
persistance offline
réorga de l'arbo
set a config file with points and other stuffs
-----


LOAD IMG DYNAMICALLY :
https://stackoverflow.com/questions/53775936/import-image-dynamically-in-react-component

loadImage = imageName => {
  import(`./assets/${imageName}.jpg`).then(image => {
    this.setState({
      image
    });
  });
};
render() {
  const { image } = this.state;
  return (
    <Fragment>
      {image && <img src={image} alt="" />}
    </Fragment>
  );
}

------

https://blog.lovemily.me/preload-images-with-pure-javascript/

yarn add prefetch-image

//commonjs
const prefetchImages = require('prefetch-image');
//ES6
import prefetchImages from 'prefetch-image';
const images = [
  '/1.png',
  '/2.jpg',
  '/3.png',
];
prefetchImages(images, options)
  .then(() => {
    console.log('all images loaded!');
    //start init your page logic...
  }); 


