import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';

import logout from'./actions/logout.js';

class Home extends Component {
	render() {
		const { currentUser: { displayName, displayPhoto }, logout } = this.props;
		return(<div>
			<img src={displayPhoto} />
			<h1>hello {displayName} !</h1>
			<button onClick={logout}>Logout!</button>
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