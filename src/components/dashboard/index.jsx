import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
	render() {
		return <h1>Dashboard!</h1>
	}
}

const mapStateToProps = ({ router: { location } }) => ({
	location
});

export default connect(mapStateToProps)(Dashboard);