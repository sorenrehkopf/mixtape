import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Form from '_/components/partials/form';

import updateSongData from '_/components/dashboard/actions/update-song-data';

import style from './style';

class AddSongDialog extends Component {
	render() {
		const { addSong, selectedSong: { name }, updateSongData } = this.props;
		
		return(
			<div className={style.main}>
				<Form onSubmit={addSong} onChange={updateSongData}>
					<input type='text' name="name" value={name}/>
					<input type='text' name="thing2"/>
					<input type='text' name="thing3"/>
					<button>submit!</button>
				</Form> 
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { selectedSong } }) => ({
	selectedSong
});

const mapDispatchToProps = (dispatch) => ({
	addSong: (event) => {console.log(event)},
	updateSongData: ({ delta }) => dispatch(updateSongData(delta))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongDialog);