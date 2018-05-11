import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style';

import QueryForm from '_/components/partials/query-form';
import { defaultQueryFields } from '_/services/get-collections';

import createPlaylist from './actions/create-playlist';

class CreatePlaylist extends Component {
	render() {
		const { createPlaylist, tags } = this.props;

		const options = [...tags, ...defaultQueryFields];

		return(
			<div>
				<h1>Create a playlist!</h1>
				<form className={`pure-form`}>
					<label>Playlist Name</label>
					<br/>
					<input className={`pure-input`} />
				</form>
				<QueryForm onSubmit={createPlaylist} tags={tags} options={options} submitText="Create!" />
			</div>
		)
	}
}

const mapStateToProps = ({ 
	main: {
		currentUser: {
			Tags: tags
		}
	}
}) =>({
	tags
});

const mapDispatchToProps = (dispatch) => ({
	createPlaylist: (data) => dispatch(createPlaylist())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);