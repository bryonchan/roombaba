export const setRoombabaLocation = (x, y) => {
	return {
		type: 'SET_ROOMBABA_LOCATION',
		x,
		y
	}
}

export const setDimensions = (width, height) => {
	return {
		type: 'SET_DIMENSIONS',
		width,
		height
	}
}

export const setWidth = (width) => {
	return {
		type: 'SET_WIDTH',
		width
	}
}

export const setDirt = (points) => {
	return {
		type: 'SET_DIRT',
		points
	}
}

export const setHeight = (height) => {
	return {
		type: 'SET_HEIGHT',
		height
	}
}

export const moveLeft = () => {
	return {
		type: 'MOVE_LEFT'
	}
}

export const moveRight = () => {
	return {
		type: 'MOVE_RIGHT'
	}
}

export const moveUp = () => {
	return {
		type: 'MOVE_UP'
	}
}

export const moveDown = () => {
	return {
		type: 'MOVE_DOWN'
	}
}


// settings: {
// 		dimensions: {
// 			w:
// 			h:
// 		},
// 		hoover: {
// 			x:
// 			y:
// 		},
// 		rubbish: [
// 			{
// 				x: 
// 				y:
// 			},
// 			...
// 		]
// 	}
export const applySettings = (settings) => {
	return {
		type: 'APPLY_SETTINGS',
		settings
	}
}

export const setTabValue = (value) => {
	return {
		type: 'SET_TAB_VALUE',
		value
	}
} 