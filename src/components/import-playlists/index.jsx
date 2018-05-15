import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaylistItem from '_/components/partials/playlist-item';
import Modal from '_/components/partials/modal';
import ImportPlaylistDialog from '_/components/partials/import-playlist-dialog';

import loadPlaylists from './actions/load-playlists';
import selectPlaylist from './actions/select-playlist';

class ImportPlaylists extends Component {
	componentDidMount() {
		const { loadPlaylists, playlists, loaded, slowImport } = this.props;

		if (!loaded) {
			loadPlaylists();
		}
	}

	render() {
		const { playlists, loading, loaded, selectedPlaylist, selectPlaylist } = this.props;

		const playlistsList = playlists.map(playlist => {
			return <PlaylistItem key={playlist.id} onSelect={() => selectPlaylist(playlist)} playlist={playlist} />
		});

		return(
			<div>
				<h1>Your playlists!</h1>
				{loaded && !loading && (<div>
					{playlistsList}
				</div>)}
				{loading && <p>loading</p>}
				{selectedPlaylist && (
					<Modal onBackgroundClick={() => selectPlaylist(null)}>
						<ImportPlaylistDialog />
					</Modal>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ importPlaylists: { playlists, loading, loaded, selectedPlaylist } }) => ({
	loaded,
	loading,
	playlists,
	selectedPlaylist
});

const mapDispatchToProps = dispatch => ({
	loadPlaylists: () => dispatch(loadPlaylists()),
	selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlaylists);