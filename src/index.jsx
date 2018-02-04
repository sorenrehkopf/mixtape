import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//custom components
import Main from './components/main/index.jsx';

render(<Router>
		<Route path="/" component={Main}>
		</Route>
	</Router>, 
	document.getElementById('app')
);