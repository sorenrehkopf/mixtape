import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import style from './style';

import login from './actions/login';

class Login extends Component {
	renderLoginPage() {
		const { authenticating, login } = this.props;

		return (
			authenticating ? (
				<div className={style.main}>
					<p>loading...</p>
				</div>
			) : (
				<div className={style.main}>
						<h1 className={style.header}>MT</h1>
						<p className={style.sub}>Mixtape gives you fine-grain control over how you categorize and utilize your music.</p>
						<button className={style.button} onClick={login}>
							<i className="fab fa-spotify"></i>
							<span>Login with Spotify</span>
						</button>
				</div>
			)
		)
	}

	render() {
		const { authenticated } = this.props;
		return(
			authenticated ? <Redirect to="/" />
			: this.renderLoginPage()
		)
	}
};

const mapStateToProps = ({ main: { authenticating, authenticated } }) => ({
	authenticated,
	authenticating
});

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);