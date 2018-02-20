import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import style from './style';

import ListItem from '_/components/partials/list-item';
import Modal from '_/components/partials/modal';
import AddSongDialog from '_/components/partials/add-song-dialog';

import search from './actions/search';
import selectSong from './actions/select-song';

class Dashboard extends Component {
	render() {
		const { songs, search, selectSong, selectedSong } = this.props;
		
		const songsList = songs.map(({ id,
				album: {
					images: [{}, {
						url: imageUrl
					}],
					name: albumName
				},
				artists: [{
					name: artistName
				}],
				duration_ms: duration,
				name,
				preview_url: previewUrl,

			}) => {
			const songData = { albumName, artistName, duration, id, imageUrl, name, previewUrl };
			return (<ListItem key={id} {...songData} onSelect={() => selectSong(songData) } />);
		});

		return(
			<div>
				<form className={`pure-form ${style.form}`} onSubmit={e => e.preventDefault()}>
					<input type="text" className={`pure-input-2-3 ${style.input}`} placeholder="Song, artist, or album name" onChange={({target}) => search(target)} />
				</form>
				{songsList}
				{selectedSong && (
					<Modal onBackgroundClick={() => selectSong()}>
						<AddSongDialog />
					</Modal>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { songs, selectedSong } }) => ({
	selectedSong,
	songs
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce(({ value }) => dispatch(search(value)), 500),
	selectSong: (id) => dispatch(selectSong(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);