import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import login from './actions/login';

class Login extends Component {
	render() {
		const { login } = this.props;
		return(
			<div>
				<h1>MT</h1>
				<p>Welcome to mixtape! Login using your spotify account to get started.</p>
				<button onClick={login}>Login!</button>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(login())
});

export default connect(() => ({	}), mapDispatchToProps)(Login);