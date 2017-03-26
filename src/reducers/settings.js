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
	dirt: [{"x":4,"y":13},{"x":5,"y":13},{"x":6,"y":13},{"x":5,"y":12},{"x":5,"y":11},{"x":5,"y":10},{"x":8,"y":13},{"x":8,"y":12},{"x":8,"y":11},{"x":8,"y":10},{"x":9,"y":11},{"x":10,"y":12},{"x":9,"y":13},{"x":10,"y":10},{"x":13,"y":13},{"x":12,"y":12},{"x":12,"y":11},{"x":12,"y":10},{"x":14,"y":11},{"x":14,"y":10},{"x":14,"y":12},{"x":13,"y":11},{"x":16,"y":13},{"x":18,"y":13},{"x":17,"y":12},{"x":16,"y":12},{"x":18,"y":12},{"x":17,"y":11},{"x":17,"y":10},{"x":11,"y":7},{"x":11,"y":6},{"x":11,"y":5},{"x":13,"y":7},{"x":13,"y":6},{"x":13,"y":5},{"x":13,"y":4},{"x":14,"y":4},{"x":15,"y":4},{"x":15,"y":5},{"x":15,"y":6},{"x":15,"y":7},{"x":14,"y":7},{"x":11,"y":4}]
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