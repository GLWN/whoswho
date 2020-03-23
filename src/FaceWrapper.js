import React, { Component } from 'react';
import Slice from './Slice';
// import './stroll.css';

import { connect } from 'react-redux';

class FaceWrapper extends Component {
    constructor() {
        super();
        // this.myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.updateDimensions = this.updateDimensions.bind(this);
        this.faceRef = React.createRef();
    }

    // shuffle = (array) => { // Fisher-Yates Modern Shuffle
    //     let i = array.length, rdm, temp;
        
    //     while(--i > 0) {
    //         rdm = Math.floor(Math.random() * (i + 1));
    //         temp = array[rdm];
    //         array[rdm] = array[i];
    //         array[i] = temp;
    //     }
    //     return array;
    // }
    // componentDidMount() {
        // const setLiDynamicHeight = () => {
        //     const wrapper = document.getElementsByClassName('face-wrapper--list')[0];
        //     const li = wrapper.getElementsByTagName("li");
        //     const liHeight = [];
            
        //     for(let i = 0; i < 3; i++) { // get 3 slices height
        //         liHeight.push(li[i].offsetHeight);
        //     }
        //     console.log(Math.min(liHeight));
        //     return Math.min(liHeight);
        // }
        // console.log('SET DYNA HEIGHT : ', setLiDynamicHeight());
        // setLiDynamicHeight();
    // }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    
    componentDidUpdate() {
        console.log(this.faceRef.current.clientHeight);
    }

    updateDimensions() {
        const height = window.innerHeight;
        
        // ratio matter
        console.log(height);
        return parseInt(height);
    }

    nextSlice = () => {
        
    }

    render() {
        return(
            <div className="face-wrapper" ref={this.faceRef}>
                {
                    this.props.success &&
                    <div className="success-overlay fade-in"></div>
                }
                <ul className="wave face-wrapper--list" style={{}}>
                    {this.props.currentFaces.map((face) => (
                        <Slice
                            key={`face_${face.faceId}-${face.sliceId}`}
                            firstname={face.firstname}
                            lastname={face.lastname}
                            faceId={face.faceId}
                            sliceId={face.sliceId}
                            height={this.updateDimensions/3} />
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faces: state.faces,
        currentFaces: state.currentFaces,
        availableFaces: state.availableFaces,
        success: state.success
    }
}

export default connect(mapStateToProps)(FaceWrapper);