import React, { Component, Fragment } from 'react'

class Loader extends Component {
    componentDidMount() {
        const loader = document.getElementsByClassName('loader-wrapper')[0];
        setTimeout(() => {
            
            loader.classList.add('anim-intro');
        }, 200);
    }

    render() {
        return(
            <div className="loader-wrapper valign-wrapper absolute">
                <div className="valign-inner">
                    <h1>WHO's<br />WHO?</h1>
                    <div className="loader"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    }
}

export default Loader