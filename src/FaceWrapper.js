import React, { Component } from 'react';
import Slice from './Slice';

import { connect } from 'react-redux';

class FaceWrapper extends Component {
    constructor() {
        super();
        this.updateDimensions = this.updateDimensions.bind(this);
        this.faceRef = React.createRef();
    }

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
                            points={face.points}
                            quote={face.quote}
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
        success: state.success,
        points: state.points,
        quote: state.quote
    }
}

export default connect(mapStateToProps)(FaceWrapper);