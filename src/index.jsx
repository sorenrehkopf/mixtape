import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

//custom components
import Main from './components/main/index.jsx';

import mainReducer from './components/main/reducer.js';

const rootReducer = combineReducers({
	main: mainReducer
});

const store = createStore(rootReducer);

render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={Main}>
			</Route>
		</Router>
	</Provider>, 
	document.getElementById('app')
);