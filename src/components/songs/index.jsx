import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '_/components/partials/list-item';
import QueryForm from '_/components/partials/query-form';
import style from './style';


import searchSongCollection from './actions/search-song-collection';

class Songs extends Component {
	render() {
		const {
			editSong,
			searchSongs,
			songs 
		} = this.props;

		const songsList = songs.map(({
			albumName,
			artistName,
			durationFriendly,
			durationMs,
			imageUrl,
			name,
			previewUrl,
			spotifyId: id
		}) => {
			const songData = { albumName, artistName, duration: { friendly: durationFriendly, ms: durationMs }, id, imageUrl, name, previewUrl };
			return (<ListItem key={id} {...songData} onSelect={() => editSong(songData) } />);
		});

		return(
			<div>
				<h1>Your songs!</h1>
				<QueryForm onSubmit={searchSongs} />
				<div>
					{songsList}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ 
	songs: {
		songs
	} 
}) => ({
	songs
});

const mapDispatchToProps = (dispatch) => ({
	editSong: data => { console.log(data) },
	searchSongs: (data) => dispatch(searchSongCollection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);