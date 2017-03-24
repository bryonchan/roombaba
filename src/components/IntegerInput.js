import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class IntegerInput extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);

        this.state = {
        	value: props.defaultValue
        }
    }

    handleChange(ev) {
    	this.setState({
    		value: ev.target.value
    	})
    	this.props.onChange(ev);
    }

    setValue(value) {
    	this.setState({
    		value: value
    	})
    }

    render() {
        return (
            <TextField inputStyle={{}} style={{width: 100}} floatingLabelText={this.props.label} value={this.state.value} type="number" onChange={this.handleChange} min={this.props.min} />
        );
    }
}

export default IntegerInput;
