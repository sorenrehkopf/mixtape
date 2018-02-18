import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import search from './actions/search';

class Dashboard extends Component {
	render() {
		const { songs, search } = this.props;
		const songsList = songs.map(song => <p>{JSON.stringify(song)}</p>)
		return(
			<div>
				<input type="text" name="searchTerm" onChange={({target}) => search(target)} />
				{songsList}
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { songs } }) => ({
	songs
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce(({ value }) => dispatch(search(value)), 500)
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);