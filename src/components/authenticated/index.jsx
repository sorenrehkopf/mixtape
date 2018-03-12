import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import style from './style';

import routes from './routes';
import Sidebar from '../partials/sidebar';

import logout from'./actions/logout';

class Authenticated extends Component {
	render() {
		const { currentRoute, currentUser: { displayName, displayPhoto, ...more }, logout, pathname } = this.props;
		console.log(more);
		return(<div className={style.main}>
			<Sidebar {...{ displayName, displayPhoto, logout, pathname }}  />
			<div className={style.scene}>
				{currentRoute}
			</div>
		</div>)
	}
}

const mapStateToProps = ({ main: { currentUser, error }, router: { location: { pathname } } }) => ({
	currentRoute: routes[pathname],
	currentUser,
	error,
	pathname
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);