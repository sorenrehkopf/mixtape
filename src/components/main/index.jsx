import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';

class Main extends Component {
	renderHomePage() {
		return <h1>the home page!</h1>
	}
	
	renderLoginPage() {
		return <h1>the login page!</h1>
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

});

export default connect(mapStateToProps, mapDispatchToProps)(Main);