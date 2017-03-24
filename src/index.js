import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { applySettings } from './actions';
import roombabaApp from './reducers';

let store = createStore(roombabaApp);
var state = store.getState();
store.dispatch(applySettings(state.settings));

ReactDOM.render(
	<Provider store={store}>
  		<App />
  	</Provider>,
  document.getElementById('root')
);
