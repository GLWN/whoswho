import React, { Component } from 'react';

class Slice extends Component {
    render() {
        return(
            <li>
                <div className="slice-overlay"></div>
                <img src={`img/${this.props.id}.jpg`} />
            </li>
        )
    }
}

export default Slice;