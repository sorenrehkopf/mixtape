import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import style from './style.scss';

import Sidebar from '../partials/sidebar/index.jsx';

import logout from'./actions/logout.js';

class Home extends Component {
	render() {
		const { currentUser: { displayName, displayPhoto }, logout } = this.props;
		return(<div>
			<Sidebar displayName={displayName} displayPhoto={displayPhoto} logout={logout} />
			<Route path="/" exact render={() => <h1>home!</h1>} />
			<Route path="/songs" render={() => <h1>songs!</h1>} />
		</div>)
	}
}

const mapStateToProps = ({ main: { currentUser } }) => ({
	currentUser
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);