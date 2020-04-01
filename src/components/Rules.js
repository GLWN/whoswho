import React, { Component } from 'react'
import IconClose from '../img/icons/close.svg'
import { connect } from 'react-redux'
import conf from '../conf'

class Rules extends Component {
    constructor(props) {
        super(props);
        this.closeLayer = this.closeLayer.bind(this);
    }

    closeLayer() {
        this.props.dispatch({
            type: 'HANDLE_RULES'
        })
    }

    render() {
        const { success, fail, clue } = conf.points;
        const { good, bad, indice } = conf.wording.rules;
        const { photo, dev, disclaimer } = conf.wording.credits;

        return(
            <div className="rules-layer">
                <img className="icon-close" alt="close icon" onClick={this.closeLayer} src={IconClose} />
                <h3>Règles du Who's Who</h3>
                <ul>
                    <li>
                        <h4>{good}</h4>
                        <p><span className="text-color">{` +${success} `}</span>points</p>
                    </li>
                    <li>
                        <h4>{bad}</h4>
                        <p><span className="text-color">{` +${fail} `}</span>points</p>
                    </li>
                    <li>
                        <h4>{indice}</h4>
                        <p><span className="text-color">{` +${clue} `}</span>points</p>
                    </li>
                </ul>
                <div className="credits">
                    <p>{photo}</p>
                    <p>{dev}</p>
                    <p className="disclaimer">{disclaimer}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        'rulesAreShown': state.rulesAreShown
    }
}

export default connect(mapStateToProps)(Rules);