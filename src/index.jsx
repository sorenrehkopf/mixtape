import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

//custom components
import Main from './components/main/index.jsx';

import mainReducer from './components/main/reducer.js';

const rootReducer = combineReducers({
	main: mainReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
	<Provider store={store}>
		<Router>
			<Route path="/" component={Main}>
			</Route>
		</Router>
	</Provider>, 
	document.getElementById('app')
);