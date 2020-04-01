import React, { Component } from 'react';
import Slice from './components/Slice';
import { connect } from 'react-redux';

class FaceWrapper extends Component {
    render() {
        const { success, currentFaces } = this.props;

        return(
            <div className="face-wrapper">
                {
                    success &&
                    <div className="success-overlay fade-in"></div>
                }
                <ul className="wave face-wrapper--list">
                    {currentFaces.map((face) => (
                        <Slice
                            key={`face_${face.faceId}-${face.sliceId}`}
                            firstname={face.firstname}
                            lastname={face.lastname}
                            faceId={face.faceId}
                            sliceId={face.sliceId}
                            points={face.points}
                            quote={face.quote} />
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