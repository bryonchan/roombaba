import React, { Component, PropTypes } from 'react';

class Dirt extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
	        <image className="dirt" xlinkHref="/dirt.png" x={this.props.x*this.props.cellWidth} y={this.props.y * this.props.cellWidth} width={this.props.cellWidth} height={this.props.cellWidth} />
        );
    }
}

export default Dirt;
