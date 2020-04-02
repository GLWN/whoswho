import React, { Component, Fragment } from 'react'
import conf from '../conf'



class Loader extends Component {
    constructor() {
        super();
        this.state = {
            'loadingText': "..."
        }
    }
    componentDidMount() {
        const loader = document.getElementsByClassName('loader-wrapper')[0];
        let iter = 0;

        setTimeout(() => {loader.classList.add('anim-intro')}, 100);

        this.loadingLoop = setInterval(() => {
            this.setState({
                'loadingText': conf.wording.loadingText[iter]
            });
            iter === conf.wording.loadingText.length - 1
                        ? iter = 0
                        : iter ++;
        }, 700);
    } 

    componentWillUnmount() {
        clearInterval(this.loadingLoop);
    }

    render() {
        return(
            <div className="loader-wrapper valign-wrapper absolute">
                <div className="valign-inner">
                    <h1>WHO's<br />WHO?</h1>
                    <div className="loader"><div></div><div></div><div></div><div></div></div>
                    <p>{this.state.loadingText}</p>
                </div>
            </div>
        )
    }
}

export default Loader