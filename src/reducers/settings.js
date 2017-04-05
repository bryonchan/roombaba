let initialState = {
	dimensions: {
		width: 20,
		height: 20,
		minWidth: 3,
		minHeight: 3,
		maxWidth: 50,
		maxHeight: 50
	},
	roombaba: {
		x: 5,
		y: 5
	},
	dirt: [{"x":2,"y":16},{"x":2,"y":14},{"x":2,"y":15},{"x":4,"y":15},{"x":4,"y":14},{"x":4,"y":16},{"x":6,"y":16},{"x":7,"y":14},{"x":6,"y":14},{"x":6,"y":15},{"x":7,"y":16},{"x":8,"y":16},{"x":7,"y":12},{"x":8,"y":12},{"x":6,"y":12},{"x":6,"y":13},{"x":4,"y":13},{"x":4,"y":12},{"x":2,"y":13},{"x":2,"y":12},{"x":3,"y":14},{"x":10,"y":16},{"x":10,"y":15},{"x":10,"y":14},{"x":14,"y":16},{"x":14,"y":15},{"x":14,"y":14},{"x":17,"y":16},{"x":17,"y":15},{"x":17,"y":14},{"x":18,"y":16},{"x":4,"y":10},{"x":2,"y":10},{"x":2,"y":9},{"x":4,"y":9},{"x":6,"y":9},{"x":6,"y":10},{"x":8,"y":9},{"x":8,"y":10},{"x":9,"y":10},{"x":9,"y":9},{"x":9,"y":8},{"x":8,"y":8},{"x":11,"y":8},{"x":11,"y":9},{"x":11,"y":10},{"x":12,"y":10},{"x":12,"y":8},{"x":11,"y":7},{"x":13,"y":7},{"x":13,"y":9},{"x":15,"y":10},{"x":15,"y":9},{"x":15,"y":8},{"x":18,"y":10},{"x":18,"y":9},{"x":18,"y":8},{"x":19,"y":9},{"x":19,"y":8},{"x":18,"y":7},{"x":15,"y":7},{"x":16,"y":7},{"x":9,"y":7},{"x":8,"y":7},{"x":5,"y":7},{"x":3,"y":7},{"x":4,"y":8},{"x":2,"y":8},{"x":6,"y":8},{"x":17,"y":13},{"x":17,"y":12},{"x":18,"y":12},{"x":14,"y":13},{"x":14,"y":12},{"x":15,"y":12},{"x":11,"y":12},{"x":10,"y":12},{"x":10,"y":13},{"x":19,"y":12},{"x":19,"y":16},{"x":19,"y":15},{"x":19,"y":13},{"x":19,"y":14},{"x":12,"y":12}]
}

const reducer = (state = initialState,  action) => {
	switch(action.type){
		case 'SET_DIMENSIONS': 
			let dimensions = Object.assign({}, state.dimensions, {width: action.width, height: action.height});
			return Object.assign({}, state, {dimensions});
		case 'SET_ROOMBABA_LOCATION': 
			let roombaba = Object.assign({}, state.roombaba, {x: action.x, y: action.y});
			return Object.assign({}, state, {roombaba});
		case 'SET_DIRT': 
			return Object.assign({}, state, {dirt: [...action.points]});
		case 'SET_WIDTH': 
			dimensions = Object.assign({}, state.dimensions, {width: action.width});
			return Object.assign({}, state, {dimensions});
		case 'SET_HEIGHT': 
			dimensions = Object.assign({}, state.dimensions, {height: action.height});
			return Object.assign({}, state, {dimensions});
		default:
			return state;
	}
}

export default reducer;