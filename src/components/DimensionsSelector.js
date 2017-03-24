import React, { Component, PropTypes } from 'react';
import {DraggableCore} from 'react-draggable';
import IntegerInput from './IntegerInput';
import RaisedButton from 'material-ui/RaisedButton';

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
			cell: {
				width: 1
			}
		};
    }

    componentDidMount() {
		this.recalculateCellWidth(this.state.dimensions.width, this.state.dimensions.height);
    }

    onResizeStop(ev, data) {
		let {x, y} = data;

		let width = Math.max(parseInt(x/this.state.cell.width, 10), this.props.minWidth);
		this.setState({
			dimensions: {height: this.state.dimensions.height, width: width},
			cloneDimensions: {height: this.state.cloneDimensions.height, width: width}
		});
		this.refs.width.setValue(width);

		let height = Math.max(parseInt(y/this.state.cell.width, 10), this.props.minHeight);
		this.setState({
			dimensions: {width: this.state.dimensions.width, height: height},
			cloneDimensions: {width: this.state.cloneDimensions.width, height: height}
		});
		this.refs.height.setValue(height);

		this.recalculateCellWidth(width, height);
		
	}

	onResize(ev, data) {
		this.setState({cloneDimensions: {width: parseInt(data.x/this.state.cell.width, 10), height: parseInt(data.y/this.state.cell.width, 10)}});
	}

	recalculateCellWidth(width, height) {
		//we want the width and height to be no bigger than half of the available area
		var widthMultiplier = (this.refs.container.offsetWidth/2) / width;
		var heightMultiplier = (this.refs.container.offsetHeight/2) / height;

		this.setState({
			cell: {
				width: Math.min(widthMultiplier, heightMultiplier)
			}
		})

	}

	onWidthChange(ev){
		let width = parseInt(ev.target.value, 10);
		if(Number.isInteger(width)){
			width = Math.max(width, this.props.minWidth);
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
			height = Math.max(height, this.props.minHeight);
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
    	let cloneDisplayWidth = this.state.cloneDimensions.width * this.state.cell.width;
    	let cloneDisplayHeight = this.state.cloneDimensions.height * this.state.cell.width;
        return (
            <div className="dimensionsSelector">
            	<div>
		            <IntegerInput label="Width" ref="width" placeholder="Width" type="number" onChange={this.onWidthChange} defaultValue={this.props.width} min={this.props.minWidth} />
		            <IntegerInput label="Height" ref="height" placeholder="Height" type="number" onChange={this.onHeightChange} defaultValue={this.props.height} min={this.props.minHeight} />
            	</div>
            	<div ref="container" className="dimensionsContainer" >
		            <div style={{height: this.state.dimensions.height * this.state.cell.width, width: this.state.dimensions.width * this.state.cell.width, border: 'solid 1px red', position: 'relative'}}>
			            <div style={{height: cloneDisplayHeight, width: cloneDisplayWidth, border: 'dotted 1px red', position: 'relative'}}>
				        </div>
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
		        </div>
		        <RaisedButton label="Next" primary={true} onClick={this.handleSave} />
            </div>
        );
    }
}

export default DimensionsSelector;
