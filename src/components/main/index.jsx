import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import style from './style';

import Login from '../login';
import Authenticated from '../authenticated';

class Main extends Component {
	render() {
		const { authenticated, authenticating } = this.props;

		if (authenticating) {
			return <p>loading...</p>
		}

		return(authenticated? <Authenticated /> : <Login />);
	}
}

const mapStateToProps = ({ main: { authenticated, authenticating } }) => ({
	authenticated,
	authenticating
});

export default connect(mapStateToProps)(Main);