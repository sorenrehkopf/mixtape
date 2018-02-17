import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import Api from './services/api';

//custom components
import Main from './components/main';

import mainReducer from './components/main/reducer';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
	main: mainReducer,
	router: routerReducer
});

let currentUser;

(async() => {
	try {
		const { data } = await Api.get('user');
		currentUser = data;
	} catch (error) {
		currentUser = null;
	}

	const store = createStore(rootReducer,
		{ main: { authenticated: !!currentUser, currentUser } },
		applyMiddleware(thunk, historyMiddleware)
	);

	render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Main />
			</ConnectedRouter>
		</Provider>, 
		document.getElementById('app')
	);
})();