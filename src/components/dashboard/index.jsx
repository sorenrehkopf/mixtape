import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import style from './style';

import ListItem from '_/components/partials/list-item';

import search from './actions/search';
import selectSong from './actions/select-song';

class Dashboard extends Component {
	render() {
		const { songs, search, selectSong } = this.props;
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

		}) => <ListItem key={id} {...{ albumName, artistName, duration, imageUrl, name, previewUrl, onSelect: () => selectSong(id) }} />);
		return(
			<div>
				<form className={`pure-form ${style.form}`} onSubmit={e => e.preventDefault()}>
					<input type="text" className={`pure-input-2-3 ${style.input}`} placeholder="Song, artist, or album name" onChange={({target}) => search(target)} />
				</form>
				{songsList}
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { songs } }) => ({
	songs
});

const mapDispatchToProps = (dispatch) => ({
	search: debounce(({ value }) => dispatch(search(value)), 500),
	selectSong: (id) => dispatch(selectSong(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);