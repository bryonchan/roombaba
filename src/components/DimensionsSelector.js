import React, { Component, PropTypes } from 'react';
import {DraggableCore} from 'react-draggable';
import IntegerInput from './IntegerInput';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

const DimensionsSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  	box-sizing: border-box;

	.inputs {
		height: 72px;
	}

	.button {
		height: 36px;
	}
`;

const DraggableWrapper = styled.div`
	width: 100%;
	border: solid 1px purple;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
	border: solid 1px pink;
	flex: 1;
`;

const Clone = styled.div`
	width: 10px;
	height: 10px;
	border: dotted 1px red;
	position: relative;
`;

class DimensionsSelector extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.onResizeStop = this.onResizeStop.bind(this);
		this.onResize = this.onResize.bind(this);

		this.onWidthChange = this.onWidthChange.bind(this);
		this.onHeightChange = this.onHeightChange.bind(this);
		this.recalculateCellWidth = this.recalculateCellWidth.bind(this);
		this.handleSave = this.handleSave.bind(this);

        this.state = {
			dimensions: {
				width: props.width,
				height: props.height
			},
			cloneDimensions: {
				width: props.width,
				height: props.height
			},
			cellWidth: 1
		};
    }

    componentDidMount() {
		this.recalculateCellWidth(this.state.dimensions.width, this.state.dimensions.height);
    }

    // componentWillUpdate(nextProps, nextState) {
        
    // }

    onResizeStop(ev, data) {
		let {x, y} = data;

		let width = Math.min(Math.max(parseInt(x/this.state.cellWidth, 10), this.props.minWidth), this.props.maxWidth); //Make sure within bounds
		this.setState({
			dimensions: {height: this.state.dimensions.height, width: width},
			cloneDimensions: {height: this.state.cloneDimensions.height, width: width}
		});
		this.refs.width.setValue(width);

		let height = Math.min(Math.max(parseInt(y/this.state.cellWidth, 10), this.props.minHeight), this.props.maxHeight);
		this.setState({
			dimensions: {width: this.state.dimensions.width, height: height},
			cloneDimensions: {width: this.state.cloneDimensions.width, height: height}
		});
		this.refs.height.setValue(height);

		this.recalculateCellWidth(width, height);
		
	}

	onResize(ev, data) {
		this.setState({cloneDimensions: {width: parseInt(data.x/this.state.cellWidth, 10), height: parseInt(data.y/this.state.cellWidth, 10)}});
	}

	recalculateCellWidth(width, height) {
		//we want the width and height to be no bigger than half of the available area
		var widthMultiplier = (this.draggableWrapper.offsetWidth/2) / width;
		var heightMultiplier = (this.draggableWrapper.offsetHeight/2) / height;

		this.setState({
			cellWidth: Math.min(widthMultiplier, heightMultiplier)
			
		})

	}

	onWidthChange(ev){
		let width = parseInt(ev.target.value, 10);
		if(Number.isInteger(width)){
			width = Math.min(Math.max(width, this.props.minWidth), this.props.maxWidth);
			this.setState(
				{
					dimensions: {
						height: this.state.dimensions.height, 
						width: width
					},
					cloneDimensions: {
						height: this.state.dimensions.height, 
						width: width
					}
				}
			);
			this.recalculateCellWidth(width, this.state.dimensions.height);
		}
	}

	onHeightChange(ev){
		let height = parseInt(ev.target.value, 10);
		if(Number.isInteger(height)){
			height = Math.min(Math.max(height, this.props.minHeight), this.props.maxHeight);
			this.setState(
				{
					dimensions: {
						height: height, width: this.state.dimensions.width
					},
					cloneDimensions: {
						height: height, width: this.state.dimensions.width
					}
				}
			);
			this.recalculateCellWidth(this.state.dimensions.width, height);
		}
	}

	handleSave(ev){
		this.props.onSave(ev, this.state.dimensions);
	}

    render() {
    	let cloneDisplayWidth = this.state.cloneDimensions.width * this.state.cellWidth;
    	let cloneDisplayHeight = this.state.cloneDimensions.height * this.state.cellWidth;
        return (
            <DimensionsSelectorWrapper>
            	<div className="inputs">
		            <IntegerInput label="Width" ref="width" placeholder="Width" type="number" onChange={this.onWidthChange} defaultValue={this.props.width} min={this.props.minWidth} max={this.props.maxWidth} />
		            <IntegerInput label="Height" ref="height" placeholder="Height" type="number" onChange={this.onHeightChange} defaultValue={this.props.height} min={this.props.minHeight}  max={this.props.maxHeight} />
            	</div>
            	<DraggableWrapper innerRef={(el) => {this.draggableWrapper = el} }>
		            <div style={{height: this.state.dimensions.height * this.state.cellWidth, width: this.state.dimensions.width * this.state.cellWidth, border: 'solid 1px red', position: 'relative'}}>
			            <Clone style={{height: cloneDisplayHeight, width: cloneDisplayWidth}} />
			            <DraggableCore
				          key="resizableHandle"
				          onStop={this.onResizeStop}
				          onDrag={this.onResize}
				          >
				          <span className="react-resizable-handle" />
				        </DraggableCore>
			        </div>
			        <span style={{position: 'absolute', top: cloneDisplayHeight/2,left: cloneDisplayWidth + 5}}>{this.state.cloneDimensions.height}</span>
			        <span style={{position: 'absolute', left: (cloneDisplayWidth/2), top: cloneDisplayHeight + 5}}>{this.state.cloneDimensions.width}</span>
		        </DraggableWrapper>
		        <RaisedButton className="button" label="Next" primary={true} onClick={this.handleSave} />
            </DimensionsSelectorWrapper>
        );
    }
}

export default DimensionsSelector;
