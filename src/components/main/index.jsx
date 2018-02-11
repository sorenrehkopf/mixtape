import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';

import login from './actions/login.js';

class Main extends Component {
	renderHomePage() {
		return <h1>the home page!</h1>
	}
	
	renderLoginPage() {
		const { login } = this.props;
		return(<div>
			<h1>the login page!</h1>
			<button onClick={login}>Login!</button>
		</div>)
	}

	render() {
		const { authenticated } = this.props;
		return(authenticated? this.renderHomePage() : this.renderLoginPage());
	}
}

const mapStateToProps = ({ main: { authenticated } }) => ({
	authenticated
});

const mapDispatchToProps = (dispatch) => ({
	login: () => dispatch(login())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);