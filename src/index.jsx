import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import Api from './services/api.js';

//custom components
import Main from './components/main/index.jsx';

import mainReducer from './components/main/reducer.js';

const rootReducer = combineReducers({
	main: mainReducer
});

let currentUser;

(async() => {
	try {
		const { data } = await Api.get('user');
		console.log(data);
		currentUser = data;
	} catch (error) {
		currentUser = null;
	}

	const store = createStore(rootReducer,
		{ main: { authenticated: !!currentUser, currentUser } },
		applyMiddleware(thunk)
	);

	render(
		<Provider store={store}>
			<Router>
				<Route path="/" component={Main}>
				</Route>
			</Router>
		</Provider>, 
		document.getElementById('app')
	);
})();