import React, { Component, PropTypes } from 'react';

class CoordinateSelector extends Component {
    static propTypes = {
        className: PropTypes.string,
        max: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handlePointClick = this.handlePointClick.bind(this);
        this.state = {
        	points: [],
        	cellWidth: 4
        }
    }

    componentDidMount() {
    	var widthMultiplier = (this.refs.container.offsetWidth - 40) / this.props.width;
		var heightMultiplier = (this.refs.container.offsetHeight - 40) / this.props.height;

		this.setState({
			cellWidth: Math.max(Math.min(widthMultiplier, heightMultiplier), 4)
			
		})

		this.pt = this.refs.svg.createSVGPoint();
    }

    handleClick(ev){
    	if(!this.props.max || (this.state.points.length < this.props.max)){
	    	var point = {
	    		x: parseInt((ev.pageX - this.getOffsetLeft(ev.target) -1) / this.state.cellWidth, 10),
	    		y: parseInt(((this.props.height * this.state.cellWidth) - (ev.pageY - this.getOffsetTop(ev.target))) / this.state.cellWidth, 10),
	    	};
	    	this.setState({
	    		points: this.state.points.concat([point])
	    	})
	    }else if(this.props.max === 1){

	    	point = {
	    		x: parseInt((ev.pageX - this.getOffsetLeft(ev.target) -1) / this.state.cellWidth, 10),
	    		y: parseInt(((this.props.height * this.state.cellWidth) - (ev.pageY - this.getOffsetTop(ev.target))) / this.state.cellWidth, 10),
	    	};

	    	this.setState({
	    		points: [point]
	    	});
	    }
    }

    getOffsetTop(el){
    	let getOffsetInt = (el, offset) => {
    		if(!el || !el.offsetTop){
    			return offset;
    		}
    		offset += el.offsetTop;
	    	return getOffsetInt(el.offsetParent, offset);
	    }

	    return getOffsetInt(el, 0);
    }

    getOffsetLeft(el){
    	let getOffsetInt = (el, offset) => {
    		if(!el || !el.offsetLeft){
    			return offset;
    		}
    		offset += el.offsetLeft;
	    	return getOffsetInt(el.offsetParent, offset);
	    }

	    return getOffsetInt(el, 0);
    }

    handlePointClick(ev, point){
    	ev.stopPropagation();
    	var array = this.state.points.filter(function(item) {
		    return item !== point
		  });
		  this.setState({
		    points: array
		  })
    }

    handleClickSvg(ev){
    	this.pt.x = ev.clientX;
	    this.pt.y = ev.clientY;

	    // The cursor point, translated into svg coordinates
	    var cursorpt =  this.pt.matrixTransform(this.refs.svg.getScreenCTM().inverse());
	    var point = {
    		x: parseInt(cursorpt.x / this.state.cellWidth, 10),
    		y: parseInt(((this.props.height * this.state.cellWidth) - (cursorpt.y)) / this.state.cellWidth, 10),
    	};
	    if(this.props.max === 1){
	    	this.setState({
	    		points: [point]
	    	});
	    } else if(!this.props.max || (this.state.points.length < this.props.max)){
	    	this.setState({
	    		points: this.state.points.concat([point])
	    	})
	    }
    }

    render() {
    	let svgPoints = this.state.points.map((point, i) => {
    		// invert Y
    		var y = ((this.props.height - 1) * this.state.cellWidth) - (point.y * this.state.cellWidth);
    		return <rect x={point.x * this.state.cellWidth} y={y} onClick={(ev) => this.handlePointClick(ev, point)} key={i} width={this.state.cellWidth} height={this.state.cellWidth} className="rect"></rect>
    	});
    	let lines = [];
    	for(var i = 0; i <= this.props.width; i++){
    		lines.push(<line key={i+'x'} y1={0} x1={i*this.state.cellWidth} y2={this.props.height*this.state.cellWidth} x2={i*this.state.cellWidth} className="line" onClick={this.handlePointClick}></line>)
    	}
    	for(var j = 0; j <= this.props.height; j++){
    		lines.push(<line key={j+'y'} y1={j*this.state.cellWidth} x1={0} y2={j*this.state.cellWidth} x2={this.props.width*this.state.cellWidth} className="line" onClick={this.handlePointClick}></line>)
    	}

    	const cancelAction = this.props.cancelAction ? React.cloneElement(this.props.cancelAction, {onClick: 
    		() => {
    			this.props.onCancel();
    		}
    	}):null;

    	const nextAction = this.props.nextAction ? React.cloneElement(this.props.nextAction, {onClick: 
    		(ev) => {
    			this.props.onSave(ev, this.state.points);
    		}
    	}):null;

        return (
        	<div className="coordinateSelector">
	        	<div ref="container" className="svgContainer">
	            	<svg ref="svg" onClick={this.handleClickSvg.bind(this)} width={this.props.width * this.state.cellWidth} height={this.props.height * this.state.cellWidth}>
	        			{lines}
	        			{svgPoints}
	        		</svg>
	            </div>
	            <div>
		        	{cancelAction}
		        	{nextAction}
		        </div>
		    </div>
        );
    }
}

export default CoordinateSelector;
