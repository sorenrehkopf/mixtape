import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '_/components/partials/list-item';
import QueryForm from '_/components/partials/query-form';
import Modal from '_/components/partials/modal';
import style from './style';

import clearSearchResults from './actions/clear-search-results';
import searchSongCollection from './actions/search-song-collection';
import selectSong from '_/components/dashboard/actions/select-song';

import { defaultQueryFields } from '_/services/get-collections';

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
		const { clearSearchResults, editSong, queryResults, search, selectSong, songs, tags } = this.props;
		const { showSearchModal } = this.state;
		const songsSource = search ? queryResults : songs;
		console.log(songs);
		const songsList = songsSource.map(({
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
			return (<ListItem key={id} {...songData} onSelect={() => selectSong(songData) } />);
		});

		const options = [...tags, ...defaultQueryFields];

		return(
			<div>
				<h1>Your songs!</h1>
				<button className={`pure-button ${style.toggle_button}`} onClick={() => this.toggleSearchModal()}>Search your collection!</button>
				{search && <button className={`pure-button ${style.clear_button}`} onClick={clearSearchResults}>Clear search results</button>}
				{showSearchModal && 
					<Modal onBackgroundClick={() => this.toggleSearchModal()}>
						<div className={style.query_form_container}>
							<h2 className={style.search_title}>Search your songs</h2>
							<QueryForm onSubmit={data => this.searchSongs(data)} options={options} tags={tags} />
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
		queryResults,
		search,
		songs,
		showSearchModal
	},
	main: {
		currentUser: {
			Tags: tags
		}
	} 
}) => ({
	queryResults,
	search,
	songs,
	showSearchModal,
	tags: tags.map(tag => {
		tag.name = tag.name.toUpperCase();
		return tag;
	})
});

const mapDispatchToProps = (dispatch) => ({
	clearSearchResults: () => dispatch(clearSearchResults()),
	selectSong: (song) => dispatch(selectSong(song)),
	searchSongs: (data) => dispatch(searchSongCollection(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);