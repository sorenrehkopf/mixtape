import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import style from './style';

import Sidebar from '../partials/sidebar';

import Dashboard from '../dashboard';
import Songs from '../songs';

import logout from'./actions/logout';

class Authenticated extends Component {
	render() {
		const { authenticated, currentRoute, currentUser, location, logout } = this.props;

		if (!authenticated) {
			return <Redirect to="/login" />;
		}

		const { displayName, displayPhoto } = currentUser;
		const { pathname } = location;

		return(<div className={style.main}>
			<Sidebar {...{ displayName, displayPhoto, logout, pathname }}  />
			<div className={style.scene}>
				<Switch>
					<Route path="/" exact component={Dashboard} />
					<Route path="/songs" exact component={Songs} />
					<Redirect to={{ pathname: '/', state: { from: this.props.location }}} />
				</Switch>
			</div>
		</div>)
	}
}

const mapStateToProps = ({ main: { authenticated, currentUser, error }, router: { location } }) => ({
	authenticated,
	currentUser,
	error,
	location
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);