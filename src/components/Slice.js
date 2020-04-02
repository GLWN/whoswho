import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconClose from '../img/icons/close.svg'
import shuffle from '../utils/shuffle.js'
import conf from '../conf'

class Slice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isHintShown: false,
            isAnswered: false
        }

        this.answerInput = React.createRef();

        //bindings
        this.handleAnswer = this.handleAnswer.bind(this);
        this.displayQuestion = this.displayQuestion.bind(this);
        this.closeQuestionLayer = this.closeQuestionLayer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    displayQuestion = () => {
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
        const { success, fail } = conf.points;

        // WIN
        if(input.toLowerCase() === faceName.toLowerCase()) {
            this.setState({
                'isOpened': false,
                'isAnswered': false
            });
            this.props.dispatch({
                type: 'SHOW_SUCCESS',
                id: this.props.faceId,
                points: success,
                success: true
            });
        // FAIL
        } else {
            this.setState({
                'isAnswered': true
            });
            this.props.dispatch({
                type: 'COUNT_FAIL',
                points: fail
            });
        }
    }

    showHint = (e) => {
        e.preventDefault();
        const { clue } = conf.points;

        this.setState({
            isHintShown: !this.state.isHintShown
        });
        this.props.dispatch({
            type: 'COUNT_FAIL',
            points: clue
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
        const effect = ["slideIn-1", "slideIn-2", "slideIn-3", "slideIn-4", "slideIn-5"];
        const effectRandom = shuffle(effect);
        const { clue } = conf.points;
        const { myNameIs, showHint } = conf.wording.slice;
        
        return(
            <li 
                className={`slice-wrapper slideIn ${effectRandom[0]}`} 
                onMouseLeave={this.closeQuestionLayer} 
                style={{height: this.props.height + 'px'}}
            >
                {
                    this.state.isAnswered &&
                    <div className="fail-overlay"></div>
                }
                <div className="slice-overlay" onClick={this.displayQuestion}></div>
                {
                    this.state.isOpened &&
                    <div className="question-overlay">
                        <img className="icon-close" alt="close icon" onClick={this.closeQuestionLayer} src={IconClose} />
                        <div className="valign-wrapper">
                            <div className="valign-inner">
                                <h2>{`${myNameIs} : `}</h2>
                                <form onSubmit={this.handleAnswer} className={this.state.isAnswered ? "shake-me" : ""}>
                                    <input
                                        type="text"
                                        className="input-text"
                                        placeholder="Entrez mon nom"
                                        required
                                        ref={this.answerInput} 
                                        onChange={this.handleInputChange}
                                        style={{
                                            borderColor: this.state.isAnswered ? 'red' : 'white'
                                        }}
                                    />
                                    <button type="submit" value="Submit" className="button">Valider</button>
                                    <br />
                                    {
                                        !this.state.isHintShown && 
                                    <button className="indice" onClick={this.showHint}>
                                        {`${showHint} (-${clue} points)`}
                                    </button>                                
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
                <img 
                    className="img-slice"
                    alt="face slice"
                    src={`img/face_${this.props.faceId}-${this.props.sliceId}.jpg`}
                />
            </li>
        )
    }
}

export default connect()(Slice);