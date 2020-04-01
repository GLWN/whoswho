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


