import React, { Component } from 'react';
import store from'./store/store';
import { connect } from 'react-redux';


const faceMargin = 20; // css bottom margin
let step = 4;

class Dashboard extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            'counter': this.props.points || 0,
            'counterDuration': 500
        }
    }

    componentDidUpdate(prevProps) {
        // console.log(prevProps.points + " / " + this.props.points);
        if(this.props.points !== prevProps.points) {
            this.animateValue(prevProps.points, this.props.points, this.state.counterDuration);
        }
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

    resetApp = (e) => {
        e.preventDefault();
        this.props.dispatch({
            type: 'RESET_APP'
        })
    }

    animateValue = (start, end, duration) => {
        // assumes integer values for start and end
        let range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        let minTimer = 50;
        // calc step time to show all interediate values
        let stepTime = Math.abs(Math.floor(duration / range));
        
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);
        
        // get current time and calculate desired end time
        let startTime = new Date().getTime();
        let endTime = startTime + duration;
        let timer;
      
        const run = () => {
            let now = new Date().getTime();
            let remaining = Math.max((endTime - now) / duration, 0);
            let value = Math.round(end - (remaining * range));
            this.setState({
                'counter': value
            })
            if (value == end) {
                clearInterval(timer);
            }
        }
        
        timer = setInterval(run, stepTime);
        run();
    }

    render() {
        return(
            <div className="dashboard not-selectable">
                {/* <button onClick={this.nextFace}>
                    <span>Next</span>
                </button> */}
                <h1>WHO's<br />WHO?</h1>
                <div onClick={this.nextFace} className="container-1">
                    <button className="button button-next">
                        <span 
                            className={this.props.success ? "animate-flicker" : ""}
                        >»</span>
                    </button>
                </div>

                <p className="counter-title" >
                    Score : 
                </p>
                <p className="counter" id="counter" style={{
                    color: this.props.points < 0
                    ? "red"
                    : "black"
                }}>{this.state.counter}
                </p>
                <a className="reset" href="" onClick={this.resetApp}>reset</a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'points': state.points,
        'success': state.success
    }
}

export default connect(mapStateToProps)(Dashboard);