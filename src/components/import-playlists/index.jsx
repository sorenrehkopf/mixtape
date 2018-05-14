import React, { Component } from 'react';
import { connect } from 'react-redux';

import PlaylistItem from '_/components/partials/playlist-item';

import loadPlaylists from './actions/load-playlists';
import slowImport from './actions/slow-import';

class ImportPlaylists extends Component {
	componentDidMount() {
		const { loadPlaylists, playlists, loaded, slowImport } = this.props;

		if (!loaded) {
			loadPlaylists();
		}
	}

	render() {
		const { playlists, loading, loaded, slowImport } = this.props;

		const playlistsList = playlists.map(playlist => {
			return <PlaylistItem key={playlist.id} onSelect={() => slowImport(playlist)} playlist={playlist} />
		});

		return(
			<div>
				<h1>Your playlists!</h1>
				{loaded && !loading && (<div>
					{playlistsList}
				</div>)}
				{loading && <p>loading</p>}
			</div>
		)
	}
}

const mapStateToProps = ({ importPlaylists: { playlists, loading, loaded } }) => ({
	loaded,
	loading,
	playlists
});

const mapDispatchToProps = dispatch => ({
	loadPlaylists: () => dispatch(loadPlaylists()),
	slowImport: (playlist) => dispatch(slowImport(playlist))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlaylists);