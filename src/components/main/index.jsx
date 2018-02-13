import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import style from './style.scss';

import Login from '../login/index.jsx';
import Home from '../home/index.jsx';

class Main extends Component {
	renderLoginPage() {
		return <Login />
	}
	
	renderHomePage() {
		return <Home />
	}

	render() {
		const { authenticated, authenticating } = this.props;

		if (authenticating) {
			return <p>loading...</p>
		}

		return(authenticated? this.renderHomePage() : this.renderLoginPage());
	}
}

const mapStateToProps = ({ main: { authenticated, authenticating } }) => ({
	authenticated,
	authenticating
});

export default connect(mapStateToProps)(Main);