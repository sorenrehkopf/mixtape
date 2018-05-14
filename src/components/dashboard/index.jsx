import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import style from './style';

import Form from '_/components/partials/form';
import ListItem from '_/components/partials/list-item';
import Modal from '_/components/partials/modal';
import AddSongDialog from '_/components/partials/add-song-dialog';

import search from './actions/search';
import selectSong from './actions/select-song';

import { convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

class Dashboard extends Component {
	render() {
		const { songs, search, selectSong } = this.props;
		
		const songsList = songs.map((song) => {
			const songData = convertBasicSongInfoFromSpotify(song);

			return (<ListItem key={id} songData={songData} onSelect={() => selectSong(songData) } />);
		});

		return(
			<div>
				<h1>Search Spotify!</h1>
				<Form className={`pure-form ${style.form}`} onChange={search}>
					<input autoFocus="true" type="text" name="songName" className={`pure-input-2-3 ${style.input}`} placeholder="Song, artist, or album name" autoComplete="off" />
				</Form>
				{songsList}
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { songs } }) => ({
	songs
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce(({ delta: { songName } }) => dispatch(search(songName)), 500),
	selectSong: (id) => dispatch(selectSong(id, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);