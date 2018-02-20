import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import style from './style';

class AddSongDialog extends Component {
	render() {
		const { selectedSong } = this.props;
		console.log(selectedSong)

		return(
			<div className={style.main}>
				<p>{JSON.stringify(selectedSong)}</p>
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { selectedSong } }) => ({
	selectedSong
});

const mapDispatchToProps = (dispatch) => ({
	
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongDialog);