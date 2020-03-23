import React, { Component } from 'react';
import store from'./store/store';
import { connect } from 'react-redux';


const faceMargin = 20; // css bottom margin
let step = 4;

class Dashboard extends Component {
    constructor(props) {
        super(props); 
    }
    nextFace = (e) => {
        e.preventDefault();
        const wrapper = document.getElementsByClassName('face-wrapper--list')[0];
        const li = wrapper.getElementsByTagName("li");
        for(let i = 0; i < 3; i++) { // get 3 slices height
            step += li[i].offsetHeight;
        }
        
        this.props.dispatch({
            type: 'NEXT_FACE'
        })
    }
    render() {
        // console.log(store.getState());
        return(
            <div className="dashboard not-selectable">
                {/* <button onClick={this.nextFace}>
                    <span>Next</span>
                </button> */}
                <h1>WHO's<br />WHO?</h1>
                <div onClick={this.nextFace} className="container-1">
                    <div className="btn btn-one">
                        <span className="">>>></span>
                    </div>
                </div>
                {/* <button>
                    <span>Reset</span>
                </button> */}
                <p className="">Score : <span></span></p>
            </div>
        )
    }
}

export default connect()(Dashboard);