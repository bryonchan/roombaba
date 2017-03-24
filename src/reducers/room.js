const initialState = {
	dimensions: {
		width: 0,
		height: 0
	},
	roombaba: {
		x: 0,
		y: 0
	},
	dirt: []
}

export const cleanDirt = (state = [], action) => {
	return state.filter((r) => { return !(r.x === action.location.x && r.y === action.location.y); })
}

const room = (state = initialState, action) => {
	switch(action.type) {
		case 'APPLY_SETTINGS': {
			return {...action.settings};
		}
		case 'MOVE_LEFT': {
			if(state.roombaba.x > 0){
				var newLocation = {x: state.roombaba.x-1, y: state.roombaba.y};
				return Object.assign({}, state, {dirt: cleanDirt(state.dirt, {location: newLocation}), roombaba: newLocation});
			}
			return state;
		}
		case 'MOVE_RIGHT': {
			if(state.roombaba.x < state.dimensions.width-1){
				newLocation = {x: state.roombaba.x+1, y: state.roombaba.y};
				return Object.assign({}, state, {dirt: cleanDirt(state.dirt, {location: newLocation}), roombaba: newLocation});
			}
			return state;
		}
		case 'MOVE_UP': {
			if(state.roombaba.y < state.dimensions.height-1){
				newLocation = {x: state.roombaba.x, y: state.roombaba.y+1};
				return Object.assign({}, state, {dirt: cleanDirt(state.dirt, {location: newLocation}), roombaba: newLocation});
			}
			return state;
		}
		case 'MOVE_DOWN': {
			if(state.roombaba.y > 0){
				newLocation = {x: state.roombaba.x, y: state.roombaba.y-1};
				return Object.assign({}, state, {dirt: cleanDirt(state.dirt, {location: newLocation}), roombaba: newLocation});
			}
			return state;
		} 
		default: 
			return state;
	}

	
}

export default room;