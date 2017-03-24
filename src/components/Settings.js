import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setRoombabaLocation as setRoombabaLocationAction,
    setDimensions as setDimensionsAction,
    setWidth,
    setHeight,
    applySettings,
    setDirt
} from '../actions';
import CoordinateSelector from './CoordinateSelector';
import DimensionsSelector from './DimensionsSelector';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const mapDispatchToProps = (dispatch) => {
    return {
        setRoombabaLocation: (x,y) => {
            dispatch(setRoombabaLocationAction(x,y));
        },
        setDimensions: (width, height) => {
            dispatch(setDimensionsAction(width, height));
        },
        setWidth: (width) => {
        	dispatch(setWidth(width));
        },
        setHeight: (height) => {
        	dispatch(setHeight(height));
        },
        setDirt: (points) => {
        	dispatch(setDirt(points));
        },
        applySettings: (settings) => {
        	dispatch(applySettings(settings));
        }
    };
};

const mapStateToProps = ({settings}) => {
	return {
	    dimensions: settings.dimensions,
	    roombaba: settings.roombaba,
	    dirt: settings.dirt
	};
}

export class Settings extends Component {

	constructor(props){
		super(props);
		this.handleSaveDimensions = this.handleSaveDimensions.bind(this);

		this.state = {
			dimensions: {
				width: props.dimensions.width,
				height: props.dimensions.height
			},
			currentPage: 1
		};
	}

	handleSaveDimensions(ev, dimensions){
		this.props.setDimensions(dimensions.width, dimensions.height);
		this.setState({
			currentPage: 2
		})
	}

	handleSaveRoombabaLocation(ev, points){
		this.props.setRoombabaLocation(points[0].x, points[0].y);
		this.setState({
			currentPage: 3
		})
	}

	handleSaveDirtLocation(ev, points){
		this.props.setDirt(points);
		this.props.applySettings({
			roombaba: this.props.roombaba, dimensions: this.props.dimensions, dirt: points
		});
		this.props.onSave();
		this.setState({
			currentPage: 1
		})

	}

	handleCancel(ev){
		this.setState({
			currentPage: this.state.currentPage - 1
		});		
	}

    render() {
        let cancelAction = <RaisedButton label="Back" />
        let nextAction = <RaisedButton label="Next"  primary={true} />
        let playAction = <RaisedButton label="Play" primary={true} />

        return (
        	<div className='settings'>
        		{this.state.currentPage === 1 &&
	            <Card className="card">
	            	<CardHeader style={{paddingBottom: 0}} className="cardHeader" title="Room Dimensions" subtitle="Please select the dimensions of the room" />
	            	<CardText className="cardText" style={{paddingTop: 0}}>
	            		<DimensionsSelector width={this.props.dimensions.width} height={this.props.dimensions.height} minWidth={this.props.dimensions.minWidth} minHeight={this.props.dimensions.minHeight} onSave={this.handleSaveDimensions} />
	            	</CardText>
		        </Card>
		        }
		        {this.state.currentPage === 2 &&
			        <Card className="card">
		            	<CardHeader style={{paddingBottom: 0}} className="cardHeader" title="Starting Location" subtitle="Please click on a location in the room" />
		            	<CardText className="cardText" style={{paddingTop: 0}}>
				        	<CoordinateSelector height={this.props.dimensions.height} width={this.props.dimensions.width} max={1} onSave={this.handleSaveRoombabaLocation.bind(this)} cancelAction={cancelAction} onCancel={this.handleCancel.bind(this)} nextAction={nextAction}/>
				        </CardText>
			        </Card>
			    }
		        {this.state.currentPage === 3 &&
		        	<Card className="card">
		            	<CardHeader style={{paddingBottom: 0}} className="cardHeader" title="Dirt patches" subtitle="Please click on areas with dirt (click to remove)" />
		            	<CardText className="cardText" style={{paddingTop: 0}}>
				        	<CoordinateSelector height={this.props.dimensions.height} width={this.props.dimensions.width}  onSave={this.handleSaveDirtLocation.bind(this)} cancelAction={cancelAction} onCancel={this.handleCancel.bind(this)} nextAction={playAction}/>
				         </CardText>
			        </Card>   
			    }	            
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);
