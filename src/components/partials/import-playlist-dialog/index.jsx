import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import PlaylistItem from '_/components/partials/playlist-item';
import Form from '_/components/partials/form';
import Autocomplete from '_/components/partials/autocomplete';

import slowImport from '_/components/import-playlists/actions/slow-import';
import quickImport from '_/components/import-playlists/actions/quick-import';

class ImportPlaylistDialog extends Component {
	constructor() {
		super();
		this.state = {
			importingFast: false,
			fastTags: {

			}
		};
	}

	render() {
		const { importing, playlist, slowImport, quickImport } = this.props;
		const { importingFast, fastTags } = this.state;

		return(
			<div className={style.main}>
				<h1>Ready to import!</h1>
				<PlaylistItem key={playlist.id} hideAddIcon={true} onSelect={() => selectPlaylist(playlist)} playlist={playlist} />
				<div className={style.options}>
					{!importingFast && (<div className={style.option}>
						<button className={style.button}>
							<i className="fas fa-" />
							<span>Serial Import</span>
						</button>
						<p>Will step you through the songs in this playlist one by one and let you fine tune your data on a song by song basis.</p>
					</div>)}
					<div className={style.option}>
						<button className={style.button}>
							<i className="fas fa-" />
							<span>Bulk Import</span>
						</button>
						{!importingFast && <p>Adds all the songs in this playlist to your collection in one go. You can choose tags to apply to every song in the list, but you cannot adjust data for individual songs.</p>}
						{!importingFast && <p>Keep in mind that the audio analysis that will be added from spotify can <em>occasionally</em> be completely innacurate.</p>}
						{importingFast && (
							<div>
								<Form className={`pure-form ${style.include_form}`} onSubmit={({ formData: { tagName }}) => this.add('include', 'tags', tagName)} clearOnSubmit={true}>
									<Autocomplete name="tagName" className={`pure-input ${style.input}`} options={tags} />
									<button className={`pure-button ${style['add-button']}`}>add</button>
								</Form>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ importPlaylists: { importing, selectedPlaylist } }) => ({
	playlist: selectedPlaylist
});

const mapDispatchToProps = dispatch => ({
	slowImport: () => dispatch(slowImport()),
	quickImport: () => dispatch(quickImport())
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlaylistDialog);