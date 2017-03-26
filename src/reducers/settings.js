let initialState = {
	dimensions: {
		width: 25,
		height: 25,
		minWidth: 3,
		minHeight: 3,
		maxWidth: 50,
		maxHeight: 50
	},
	roombaba: {
		x: 5,
		y: 5
	},
	dirt: [{"x":3,"y":20},{"x":3,"y":19},{"x":3,"y":18},{"x":3,"y":17},{"x":3,"y":16},{"x":4,"y":18},{"x":5,"y":18},{"x":6,"y":18},{"x":6,"y":19},{"x":6,"y":20},{"x":6,"y":17},{"x":6,"y":16},{"x":8,"y":20},{"x":8,"y":16},{"x":8,"y":17},{"x":8,"y":18},{"x":8,"y":19},{"x":9,"y":20},{"x":10,"y":20},{"x":9,"y":18},{"x":10,"y":18},{"x":9,"y":16},{"x":10,"y":16},{"x":12,"y":16},{"x":12,"y":17},{"x":12,"y":18},{"x":12,"y":19},{"x":12,"y":20},{"x":13,"y":16},{"x":14,"y":16},{"x":16,"y":19},{"x":16,"y":20},{"x":16,"y":18},{"x":16,"y":16},{"x":16,"y":17},{"x":17,"y":16},{"x":18,"y":16},{"x":20,"y":17},{"x":20,"y":18},{"x":20,"y":19},{"x":20,"y":20},{"x":21,"y":20},{"x":22,"y":20},{"x":22,"y":19},{"x":22,"y":18},{"x":22,"y":17},{"x":22,"y":16},{"x":21,"y":16},{"x":20,"y":16},{"x":3,"y":13},{"x":3,"y":12},{"x":3,"y":11},{"x":4,"y":10},{"x":5,"y":11},{"x":6,"y":10},{"x":7,"y":11},{"x":7,"y":12},{"x":7,"y":13},{"x":9,"y":13},{"x":9,"y":12},{"x":9,"y":11},{"x":9,"y":10},{"x":11,"y":10},{"x":11,"y":11},{"x":11,"y":12},{"x":11,"y":13},{"x":10,"y":13},{"x":13,"y":13},{"x":13,"y":12},{"x":13,"y":11},{"x":13,"y":10},{"x":14,"y":13},{"x":15,"y":12},{"x":14,"y":11},{"x":15,"y":10},{"x":15,"y":9},{"x":13,"y":9},{"x":9,"y":9},{"x":10,"y":9},{"x":11,"y":9},{"x":4,"y":9},{"x":6,"y":9},{"x":17,"y":13},{"x":17,"y":12},{"x":17,"y":11},{"x":17,"y":9},{"x":17,"y":10},{"x":19,"y":9},{"x":18,"y":9},{"x":21,"y":9},{"x":21,"y":11},{"x":21,"y":12},{"x":21,"y":13},{"x":21,"y":10},{"x":22,"y":9},{"x":23,"y":10},{"x":23,"y":11},{"x":23,"y":12},{"x":22,"y":13}]
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