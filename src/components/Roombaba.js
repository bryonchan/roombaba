import React, { Component, PropTypes } from 'react';

class Roombaba extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    render() {
        return (
        	<g>
	            <image className="roombaba" xlinkHref="/roombaba.png" x={this.props.x*this.props.cellWidth} y={this.props.y * this.props.cellWidth} width={this.props.cellWidth} height={this.props.cellWidth} />
            </g>
        );
    }
}

export default Roombaba;
