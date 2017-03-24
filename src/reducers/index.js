import {combineReducers} from 'redux';
import settings from './settings.js';
import room from './room.js';
import tabs from './tabs.js';

const roombabaApp = combineReducers({settings, room, tabs});

export default roombabaApp;