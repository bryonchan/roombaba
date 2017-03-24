import React, { Component } from 'react';
import { connect } from 'react-redux';
import Roombaba from './Roombaba';
import Dirt from './Dirt';
import {
    moveLeft as moveLeftAction,
    moveRight as moveRightAction,
    moveUp as moveUpAction,
    moveDown as moveDownAction,
} from '../actions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBackward from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

const mapDispatchToProps = (dispatch) => {
    return {
        moveLeft: () => {
            dispatch(moveLeftAction());
        },
        moveRight: () => {
            dispatch(moveRightAction());
        },
        moveUp: () => {
            dispatch(moveUpAction());
        },
        moveDown: () => {
            dispatch(moveDownAction());
        },
    };
};

const mapStateToProps = ({room}) => {
    return {
    	roombaba: room.roombaba,
    	dimensions: room.dimensions,
    	dirt: room.dirt
    };
};

export class RoomView extends Component {
	constructor(props){
		super(props);
		this.recalculateCellWidth = this.recalculateCellWidth.bind(this);
		this.state = {
			cellWidth: 1
		}
	}

	recalculateCellWidth(width, height) {
		//we want the width and height to be no bigger than half of the available area
		var widthMultiplier = (this.refs.container.offsetWidth - 20) / width;
		var heightMultiplier = (this.refs.container.offsetHeight - 20) / height;

		this.setState({
			cellWidth: Math.max(Math.min(widthMultiplier, heightMultiplier), 4)
		})
	}
	
	componentDidMount() {
		this.refs.roomViewContainer.focus();
	   	this.recalculateCellWidth(this.props.dimensions.width, this.props.dimensions.height); 
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.dimensions.width != this.props.dimensions.width || nextProps.dimensions.height != this.props.dimensions.height){
		   	this.recalculateCellWidth(nextProps.dimensions.width, nextProps.dimensions.height); 
		   }
	}

	componentDidUpdate(prevProps, prevState) {
	    if(this.props.focus === true){
			this.refs.roomViewContainer.focus();
		}
	}

	handleLeftClick() {
		this.props.moveLeft();
	}

	handleRightClick() {
		this.props.moveRight();
	}

	handleUpClick() {
		this.props.moveUp();
	}

	handleDownClick() {
		this.props.moveDown();
	}

	handleKeyDown(ev){
		switch(ev.keyCode)
		{
			case 87: //w
				this.props.moveUp();
				return;
			case 83: //s
				this.props.moveDown();
				return;
			case 65: //a
				this.props.moveLeft();
				return;
			case 68: //d
				this.props.moveRight();
				return;
			default:
				return;
		}
	}

    render() {
    	let dirt = this.props.dirt.map((r, i) => {
    		// invert the y
    		let y = this.props.dimensions.height - 1 - r.y;
    		return <Dirt x={r.x} y={y} key={i} cellWidth={this.state.cellWidth} />;
    	});
    	let hooverY = this.props.dimensions.height - 1 - this.props.roombaba.y;

        return (
        	<div className="roomViewContainer" ref="roomViewContainer" tabIndex={1} onKeyDown={this.handleKeyDown.bind(this)}>
				<div ref="container" className="svgContainer">			
					<svg className="svg" width={this.props.dimensions.width * this.state.cellWidth}  height={this.props.dimensions.height * this.state.cellWidth}>
						<Roombaba x={this.props.roombaba.x} y={hooverY}  cellWidth={this.state.cellWidth} />
						{dirt}
					</svg>
				</div>
				<div className="buttons" style={{position: 'relative'}}>
					<IconButton className='up' tooltipPosition='top-center' onClick={this.handleUpClick.bind(this)} tooltip="Up" style={{position: 'absolute', top: '0px', left: '48px'}}>
				      <ArrowUpward />
				    </IconButton>
				    <IconButton  className='left' tooltipPosition='top-center' tooltip="Left" onClick={this.handleLeftClick.bind(this)} style={{position: 'absolute', top: '48px', left: '0px'}}>
				      <ArrowBackward />
				    </IconButton>
				    <IconButton className='down' tooltipPosition='top-center' onClick={this.handleDownClick.bind(this)} tooltip="Down" style={{position: 'absolute', top: '48px', left: '48px'}}>
				      <ArrowDownward />
				    </IconButton>
					<IconButton className='right' tooltipPosition='top-center' onClick={this.handleRightClick.bind(this)} tooltip="Right" style={{position: 'absolute', top: '48px', left: '96px'}}>
				      <ArrowForward />
				    </IconButton>
				</div>
				<img className="wasd" src="wasd.png" />
			</div>            
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomView);
