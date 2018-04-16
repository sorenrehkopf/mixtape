import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '_/components/partials/list-item';
import QueryForm from '_/components/partials/query-form';
import Modal from '_/components/partials/modal';
import style from './style';


import searchSongCollection from './actions/search-song-collection';

class Songs extends Component {
	constructor() {
		super()
		this.state = {
			showSearchModal: false
		}
	}

	async searchSongs(data) {
		const { searchSongs } = this.props;
		await searchSongs(data);
		this.toggleSearchModal();
	}

	toggleSearchModal() {
		this.setState({
			showSearchModal: !this.state.showSearchModal
		});
	}

	render() {
		const { editSong, songs } = this.props;
		const { showSearchModal } = this.state;

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
				<button className={`pure-button ${style.toggle_button}`} onClick={() => this.toggleSearchModal()}>Search your collection!</button>
				{showSearchModal && 
					<Modal onBackgroundClick={() => this.toggleSearchModal()}>
						<div className={style.query_form_container}>
							<h2 className={style.search_title}>Search your songs</h2>
							<QueryForm onSubmit={data => this.searchSongs(data)} />
						</div>
					</Modal>
				}
				<div>
					{songsList}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ 
	songs: {
		songs,
		showSearchModal
	} 
}) => ({
	songs,
	showSearchModal
});

const mapDispatchToProps = (dispatch) => ({
	editSong: data => { console.log(data) },
	searchSongs: (data) => dispatch(searchSongCollection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);