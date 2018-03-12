import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '_/components/partials/list-item';

class Songs extends Component {
	render() {
		const { songs, editSong } = this.props;
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
				{songsList}
			</div>
		)
	}
}

const mapStateToProps = ({ main: { currentUser: { Songs: songs } } }) => ({
	songs
});

const mapDispatchToProps = (dispatch) => ({
	editSong: data => { console.log(data) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);