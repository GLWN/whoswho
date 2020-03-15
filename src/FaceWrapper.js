import React, { Component } from 'react';
import Slice from './Slice';

import { connect } from 'react-redux';

class FaceWrapper extends Component {
    constructor() {
        super();
        // this.myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    componentDidMount() {
        // window.stroll.bind('.face-wrapper ul');
    }

    render() {
        // window.stroll.bind('.face-wrapper ul');
        // console.log(this.shuffle(this.myArray));
        // this.shuffle(this.myArray);
        console.log(this.props);
        return(
            <div className="face-wrapper">
                {/* <div className="overlay"></div> */}
                <ul className="wave face-wrapper--list" style={{height: window.innerHeight}}>
                    {this.props.faces.map((face) => (
                        <Slice id={face.id}/>
                        // key={face.id + Date.now()}
                    ))}
                </ul>
                {/* {window.stroll.bind('.face-wrapper--list')} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        faces: state.faces,
        availableFaces: state.availableFaces
    }
}

export default connect(mapStateToProps)(FaceWrapper);