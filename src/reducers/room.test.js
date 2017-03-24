import room from './room';
import {cleanDirt} from './room';

describe('Room reducer', () => {
	it('should move left', () => {
		var state = room({roombaba: {x: 1, y: 0}}, {type: 'MOVE_LEFT'});
		expect(state.roombaba).toEqual({x: 0, y: 0});
	});

	it('should not go beyond the wall', () => {
		var dimensions = {width: 3, height: 3};
		var state = room({dimensions, roombaba: {x: 0, y: 0}}, {type: 'MOVE_LEFT'});
		expect(state.roombaba).toEqual({x: 0, y: 0});

		state = room(state, {type: 'MOVE_RIGHT'});
		state = room(state, {type: 'MOVE_RIGHT'});
		expect(state.roombaba).toEqual({x: 2, y: 0});

		state = room(state, {type: 'MOVE_RIGHT'});
		expect(state.roombaba).toEqual({x: 2, y: 0});
	});

    it('should clear dirt', () => {
    	let dirtPatches = [{x:0, y: 0}, {x:5, y: 5}, {x:10, y: 10}]
		expect(cleanDirt(dirtPatches, {
			location: {
				x: 0,
				y: 0
			}
		})).toEqual([{x:5, y: 5}, {x:10, y: 10}]);        
    });
});
