import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rules from './components/Rules'
import pictoFace from './img/picto/picto-face-3d.png';
import pictoWin from './img/picto/picto-applause-win.jpg';

class Dashboard extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            'counter': this.props.points || 0,
            'counterDuration': 500
        }
    }

    componentDidUpdate(prevProps) {
        const { points } = this.props;
        if(points !== prevProps.points) {
            this.animateValue(prevProps.points, points, this.state.counterDuration);
        }
    }

    nextFace = (e) => {
        e.preventDefault();
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

    showRules = (e) => {
        e.preventDefault();
        this.props.dispatch({
            type: 'HANDLE_RULES'
        });
    }

    animateValue = (start, end, duration) => {
        let range = end - start;
        let minTimer = 50;
        let stepTime = Math.abs(Math.floor(duration / range));
        
        stepTime = Math.max(stepTime, minTimer);
        
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
            if (value === end) {
                clearInterval(timer);
            }
        }
        
        timer = setInterval(run, stepTime);
        run();
    }

    displayFaceCount = () => {
        let statusText = "";
        const nbFaces = this.props.availableFaces.length

        switch (nbFaces) {
            case 0 :
                statusText = "Le jeu est terminé, bravo !";
                return statusText;
            case 1 :
                statusText = "Il ne reste plus qu'une personne à trouver" ;
                return statusText;
            case 2 :
                statusText = "Il ne reste plus que 2 personnes à trouver" ;
                return statusText;
            default :
                statusText = "Il reste " + this.props.availableFaces.length + " personnes à trouver" ;
                return statusText;
        }
    }

    render() {
        const { points, success, availableFaces, rulesAreShown } = this.props;

        return(
            <div className="dashboard not-selectable">
                { rulesAreShown &&
                    <Rules />
                }
                <h1>WHO's<br />WHO?</h1>
                { availableFaces.length > 0 &&
                    <div onClick={this.nextFace} className="container-1">
                        <button className="button button-next">
                            <img className={success ? "animate-flicker picto-face" : "picto-face"} src={pictoFace} alt="face picto" />
                        </button>
                    </div>
                }
                
                { /**** WIN ****/ }
                { availableFaces.length === 0 &&
                    <div className="container-1">
                        <button className="button button-next">
                        <img className="animate-flicker picto-win" src={pictoWin} alt="win picto" />
                        </button>
                    </div>
                }
                { /****=====****/ }

                <p className="counter-title" >
                    Score
                </p>
                <p className="counter" id="counter" style={{
                    color: points < 0
                    ? "red"
                    : "black"
                }}>{this.state.counter}</p>

                <p className="credits">Photo credits : Martin Schoeller</p>
                <p className="counter-faces">{this.displayFaceCount()}</p>
                <button className="rules button" onClick={this.showRules}>règles</button>
                <button className="reset button" onClick={this.resetApp}>reset</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'points': state.points,
        'success': state.success,
        'availableFaces': state.availableFaces,
        'rulesAreShown': state.rulesAreShown
    }
}

export default connect(mapStateToProps)(Dashboard);