import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import QueryForm from '_/components/partials/query-form';
import Form from '_/components/partials/form';
import PlaylistSuccess from '_/components/partials/playlist-success';
import { defaultQueryFields } from '_/services/get-collections';

import createPlaylist from './actions/create-playlist';
import updatePlaylistData from './actions/update-playlist-data';
import clearCreatedPlaylist from './actions/clear-created-playlist';

class CreatePlaylist extends Component {
	render() {
		const { createPlaylist, createdPlaylist, clearCreatedPlaylist, loading, name, tags, updatePlaylistData } = this.props;
		const options = [...tags, ...defaultQueryFields];

		return(
			<div>
				<h1>Create a playlist!</h1>
				{!createdPlaylist && !loading && (<div>
					<h2 className={style.sub_header}>Playlist Details</h2>
					<Form className={`pure-form`} onChange={updatePlaylistData}>
						<label>Name</label>
						<br/>
						<input name="name" value={name} type="text" className={`pure-input ${style.name_input}`} />
					</Form>
					<h2 className={style.sub_header}>Song Criteria</h2>
					<QueryForm onSubmit={createPlaylist} tags={tags} options={options} submitText="Create!" />
				</div>)}
				{!loading && createdPlaylist && <PlaylistSuccess clearCreatedPlaylist={clearCreatedPlaylist} playlist={createdPlaylist} />}
				{loading && <p>loading...</p>}
			</div>
		)
	}
}

const mapStateToProps = ({ 
	main: {
		currentUser: {
			Tags: tags
		}
	},
	createPlaylist: {
		playlistData: {
			name
		},
		createdPlaylist,
		loading
	}
}) =>({
	createdPlaylist,
	loading,
	name,
	tags
});

const mapDispatchToProps = (dispatch) => ({
	createPlaylist: (data) => dispatch(createPlaylist(data)),
	clearCreatedPlaylist: () => dispatch(clearCreatedPlaylist()),
	updatePlaylistData: ({ formData: data }) => dispatch(updatePlaylistData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);