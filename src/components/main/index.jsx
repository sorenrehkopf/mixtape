import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Switch } from 'react-router';
import style from './style';

import Login from '../login';
import Authenticated from '../authenticated';

class Main extends Component {
	render() {
		const { authenticated, authenticating } = this.props;

		if (authenticating) {
			return <p>loading...</p>
		}

		return(
			<Switch>
				<Route path="/login" exact component={Login} />
				<Route path="/" component={Authenticated} />
			</Switch>
		);
	}
}

const mapStateToProps = ({ main: { authenticated, authenticating } }) => ({
	authenticated,
	authenticating
});

export default withRouter(connect(mapStateToProps)(Main));
