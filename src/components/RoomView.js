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

import styled from 'styled-components';

const RoomViewWrapper = styled.div`

		display: flex;
		width: 100%;
		flex-direction: column;
		padding: 10px;
		box-sizing: border-box;
		outline: 0;
		/*border: solid 1px red;*/
		height: 100%;

		.buttons{
		  box-sizing: border-box;
		  width: 192px;
		  margin: 0 auto;
		  position: absolute;
		  bottom: 138px;
		  left: 0px;
		  right: 0px;
		  opacity: 0.6;
		}

		.svgContainer{
		  box-sizing: border-box;

		  height: 100%;
		    background: url('/rug-blue.png');
		  background-repeat: no-repeat;
		  background-size: 100% 100%;

		}

		.svgContainer .svg{
		  display: block;
		  margin: 0 auto;
		}

	
`;

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
		this.roomViewWrapper.focus();
	   	this.recalculateCellWidth(this.props.dimensions.width, this.props.dimensions.height); 
	}
	
	componentWillReceiveProps(nextProps) {
		if(nextProps.dimensions.width != this.props.dimensions.width || nextProps.dimensions.height != this.props.dimensions.height){
		   	this.recalculateCellWidth(nextProps.dimensions.width, nextProps.dimensions.height); 
		   }
	}

	componentDidUpdate(prevProps, prevState) {
	    if(this.props.focus === true){
			this.roomViewWrapper.focus();
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
    	let iconSize = 40;
    	let buttonSize = iconSize + 24;
        return (
        	<RoomViewWrapper innerRef={(el) => {this.roomViewWrapper = el}} tabIndex={1} onKeyDown={this.handleKeyDown.bind(this)}>
				<div ref="container" className="svgContainer">			
					<svg className="svg" width={this.props.dimensions.width * this.state.cellWidth}  height={this.props.dimensions.height * this.state.cellWidth}>
						<Roombaba x={this.props.roombaba.x} y={hooverY}  cellWidth={this.state.cellWidth} />
						{dirt}
					</svg>
				</div>
				<div className="buttons">
					<IconButton className='up' tooltipPosition='top-center' onClick={this.handleUpClick.bind(this)} tooltip="" iconStyle={{height: iconSize, width: iconSize}} style={{position: 'absolute', top: '0px', left: buttonSize, width: buttonSize, height: buttonSize}}>
				      <ArrowUpward />
				    </IconButton>
				    <IconButton  className='left' tooltipPosition='top-center' tooltip="" onClick={this.handleLeftClick.bind(this)}  iconStyle={{height: iconSize, width: iconSize}} style={{position: 'absolute', top: buttonSize, left: '0px', width: buttonSize, height: buttonSize}}>
				      <ArrowBackward />
				    </IconButton>
				    <IconButton className='down' tooltipPosition='top-center' onClick={this.handleDownClick.bind(this)} tooltip=""  iconStyle={{height: iconSize, width: iconSize}} style={{position: 'absolute', top: buttonSize, left: buttonSize, width: buttonSize, height: buttonSize}}>
				      <ArrowDownward />
				    </IconButton>
					<IconButton className='right' tooltipPosition='top-center' onClick={this.handleRightClick.bind(this)} tooltip=""  iconStyle={{height: iconSize, width: iconSize}} style={{position: 'absolute', top: buttonSize, left: buttonSize * 2, width: buttonSize, height: buttonSize}}>
				      <ArrowForward />
				    </IconButton>
				</div>
				<img className="wasd" src="wasd.png" />
			</RoomViewWrapper>            
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomView);
