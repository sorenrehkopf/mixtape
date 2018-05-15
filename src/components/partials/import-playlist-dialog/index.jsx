import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import PlaylistItem from '_/components/partials/playlist-item';
import Form from '_/components/partials/form';
import Autocomplete from '_/components/partials/autocomplete';
import Tag from '_/components/partials/tag';

import slowImport from '_/components/import-playlists/actions/slow-import';
import quickImport from '_/components/import-playlists/actions/quick-import';

class ImportPlaylistDialog extends Component {
	constructor() {
		super();
		this.state = {
			importingFast: false,
			fastTags: {}
		};
	}

	addTag = (name) => {
		const { fastTags } = this.state;
		const delta = { fastTags: { ...fastTags } };

		delta.fastTags[name] = true;
		this.setState(delta);
	}

	removeTag = (name) => {
		const { fastTags } = this.state;
		const delta = {...fastTags};

		delete delta[name];
		this.setState(delta);
	}

	quickImport = () => {
		const { quickImport } = this.props;
		const { importingFast, fastTags } = this.state;
		console.log(importingFast);
		if (!importingFast) {
			this.setState({
				importingFast: true
			});
		} else {
			quickImport(fastTags);
		}
	}

	render() {
		const { importing, playlist, quickImportSuccess, slowImport, tags } = this.props;
		const { importingFast, fastTags } = this.state;

		const addedTags = Object.keys(fastTags).map(tag => <Tag key={tag} name={tag} remove={() => this.removeTag(tag)} />);

		return(
			<div className={style.main}>
				{!quickImportSuccess && <h1>Ready to import!</h1>}
				<PlaylistItem key={playlist.id} hideAddIcon={true} onSelect={() => selectPlaylist(playlist)} playlist={playlist} />
				<div className={style.options}>
					{!importingFast && (<div className={`${style.option} ${style.serial}`}>
						<button className={style.button} onClick={slowImport}>
							<i className="fas fa-list-alt" />
							<span>Serial Import</span>
						</button>
						<p>Will step you through the songs in this playlist one by one and let you fine tune your data on a song by song basis.</p>
					</div>)}
					{!importing && !quickImportSuccess && <div className={style.option}>
						{importingFast && (
							<div className={style.tag_container}>
								<h3>Tags: </h3>
								<div className={style.tags_list}>{addedTags}</div>
								<Form className={`pure-form ${style.include_form}`} onSubmit={({ formData: { tagName }}) => this.addTag(tagName)} clearOnSubmit={true}>
									<Autocomplete name="tagName" className={`pure-input ${style.input}`} options={tags} />
									<button className={`pure-button ${style['add-button']}`}>add</button>
								</Form>
							</div>
						)}
						<button className={style.button} onClick={this.quickImport}>
							<i className="fas fa-archive" />
							{!importingFast && <span>Bulk Import</span>}
							{importingFast && <span>Import Playlist</span>}
						</button>
						{!importingFast && <p>Adds all the songs in this playlist to your collection in one go. You can choose tags to apply to every song in the list, but you cannot adjust data for individual songs.</p>}
						{!importingFast && <p>**Keep in mind that the audio analysis that will be added from spotify can <em>occasionally</em> be completely innacurate.**</p>}
						{importingFast && <p>Any tags added here will be applied to every song in the playlist when it is added.</p>}
						{importingFast && <p>Songs from this playlist that are already in your collection will not be updated.</p>}
					</div>}
					{importing && <h2>importing...</h2>}
					{quickImportSuccess && <h2>Successfully Imported</h2>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ importPlaylists: { importing, quickImportSuccess, selectedPlaylist }, main: { currentUser: { Tags: tags } } }) => ({
	importing,
	playlist: selectedPlaylist,
	quickImportSuccess,
	tags
});

const mapDispatchToProps = dispatch => ({
	slowImport: () => dispatch(slowImport()),
	quickImport: (tags) => dispatch(quickImport(tags))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImportPlaylistDialog);