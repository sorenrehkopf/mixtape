import React, { Component } from 'react';
import { connect } from 'react-redux';

class Songs extends Component {
	render() {
		return <h1>Songs!</h1>
	}
}

const mapStateToProps = ({ router: { location } }) => ({
	location
});

export default connect(mapStateToProps)(Songs);