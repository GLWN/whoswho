import React, { Component } from 'react';
import store from'./store/store';
import { connect } from 'react-redux';


const faceMargin = 20; // css bottom margin
let step = 4;

class Dashboard extends Component {
    constructor(props) {
        super(props); 
    }
    nextFace = () => {
        const wrapper = document.getElementsByClassName('face-wrapper--list')[0];
        const li = wrapper.getElementsByTagName("li");
        for(let i = 0; i < 3; i++) { // get 3 slices height
            step += li[i].offsetHeight;
        }

        step -= 2 * faceMargin;

        wrapper.scrollTo({
            top: step,
            left: 0,
            behavior: 'smooth'
        });
        
        this.props.dispatch({
            type: 'ADD_NEW_FACES'
        })
        // rendre inactif btn jusqu'à fin de l'ani et retirer l'élément précédent puis réaligner
        // setTimeout(() => {
        //     this.props.dispatch({
        //         type: 'REMOVE_OLD_FACES'
        //     }) 
        // }, 2000);


        window.stroll.unbind('.face-wrapper--list');
        window.stroll.bind('.face-wrapper--list');
    }
    render() {
        // console.log(store.getState());
        return(
            <div className="dashboard">
                <button onClick={this.nextFace}>Next</button>
                <button>Reset</button>
                <h2>WHO'sWHO?</h2>
                <p>Score : <span></span></p>
            </div>
        )
    }
}

export default connect()(Dashboard);