import React, { Component } from 'react';
import IconClose from './img/icons/close.svg';
import { connect } from 'react-redux';

class Rules extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.closeLayer = this.closeLayer.bind(this);
    }

    closeLayer() {
        this.props.dispatch({
            type: 'HANDLE_RULES'
        })
    }

    render() {
        return(
            <div className="rules-layer">
                <img className="icon-close" alt="close icon" onClick={this.closeLayer} src={IconClose} />
                <h3>Règles du Who's Who</h3>
                <ul>
                    <li>
                        <h4>Bonne réponse</h4>
                        <p><span> +20 </span>points</p>
                    </li>
                    <li>
                        <h4>Mauvaise réponse</h4>
                        <p><span> -10 </span>points</p>
                    </li>
                    <li>
                        <h4>Indice</h4>
                        <p><span> -5 </span>points</p>
                    </li>
                    {/* <li><span>- </span>Chaque personnage trouvé est retiré de la liste</li> */}
                </ul>
                <div className="credits">
                    <p>Photo credits : Martin Schoeller</p>
                    <p>Dev by GLWN</p>
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