import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconClose from './img/icons/close.svg'

class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isHintShown: false,
            isAnswered: false
        }
        this.answerInput = React.createRef();
        this.myImg = React.createRef();

        //bindings
        this.handleAnswer = this.handleAnswer.bind(this);
        this.displayQuestion = this.displayQuestion.bind(this);
        this.closeQuestionLayer = this.closeQuestionLayer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    nextSlice = (e) => { // for A mode
        e.preventDefault();
        // this.props.dispatch({
        //     'type': 'NEXT_SLICE',
        //     'faceId': this.props.faceId,
        //     'sliceId': this.props.sliceId
        // })
    }
    displayQuestion = () => { // for B mode
        if (!this.state.isOpened) {
            this.setState({
                isOpened: true
            }, () => this.answerInput.current.focus());
            
        }
    }
    handleAnswer = (e) => {
        e.preventDefault();
        const input = this.answerInput.current.value;
        const faceName = this.props.firstname + (this.props.lastname ? " " + this.props.lastname : "");
        if(input.toLowerCase() === faceName.toLowerCase()) {
            this.setState({
                'isOpened': false,
                'isAnswered': false
            });
            this.props.dispatch({
                type: 'SHOW_SUCCESS',
                id: this.props.faceId,
                success: true
            });
        } else {
            this.setState({
                'isAnswered': true
            });
            this.props.dispatch({
                type: 'COUNT_FAIL',
                points: 10
            });
        }
    }

    showHint = (e) => {
        e.preventDefault();
        this.setState({
            isHintShown: !this.state.isHintShown
        });
        this.props.dispatch({
            type: 'COUNT_FAIL',
            points: 5
        });
    }

    handleInputChange = (e) => {
        e.preventDefault();
    }

    closeQuestionLayer = () => {
        this.setState({
            isOpened: false,
            isAnswered: false
        });
    }

    render() {
        const slideInEffect = ["slideIn-1", "slideIn-2", "slideIn-3", "slideIn-4", "slideIn-5"];
        const slideInEffectRandom = slideInEffect[Math.floor(Math.random() * slideInEffect.length)];
        
        return(
            <li className={`slice-wrapper slideIn ${slideInEffectRandom}`} onMouseLeave={this.closeQuestionLayer} style={{height: this.props.height + 'px'}} >
                {
                    this.state.isAnswered &&
                    <div className="fail-overlay"></div>
                }
                <div className="slice-overlay" onClick={this.displayQuestion}></div>
                {
                    this.state.isOpened &&
                    <div className="question-overlay">
                        <img className="icon-close" onClick={this.closeQuestionLayer} src={IconClose} />
                        <div className="valign-wrapper center width-100">
                            <div className="valign-inner">
                                <h2>My name is :</h2>
                                <form onSubmit={this.handleAnswer} className={this.state.isAnswered ? "shake-me" : ""}>
                                    <input
                                        type="text"
                                        className="input-text"
                                        required
                                        ref={this.answerInput} 
                                        onChange={this.handleInputChange}
                                        style={{
                                            borderColor: this.state.isAnswered ? 'red' : 'white'
                                        }}
                                    />
                                    <button type="submit" value="Submit" className="button">Valider</button>
                                    {/* <button>VALIDATE</button> */}
                                    <br />
                                    {
                                        !this.state.isHintShown && 
                                        <a className="indice" href="" onClick={this.showHint}>voir l'indice (-5 points)</a>                                
                                    }
                                    {
                                        this.state.isHintShown && 
                                        <p className="indice">{this.props.quote}</p>
                                    }
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                }
                {/* <div className="slider slide-in"> */}
                {/* <img className="bg" src={`_img/bg-${this.props.sliceId}.jpg`} /> */}
                <img 
                    className="img-slice" 
                    // onLoad={() => console.log(this.myImg.current.offsetHeight)}
                    ref={this.myImg} 
                    src={`_img/face_${this.props.faceId}-${this.props.sliceId}.jpg`} 
                />
            </li>
        )
    }
}

export default connect()(Slice);