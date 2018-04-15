import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '_/components/partials/list-item';
import Form from '_/components/partials/form';
import Tag from '_/components/partials/tag';
import QueryParam from '_/components/partials/query-param';
import style from './style';

import addIncludeTag from './actions/add-include-tag';
import addExcludeTag from './actions/add-exclude-tag';
import addIncludeParam from './actions/add-include-param';
import addExcludeParam from './actions/add-exclude-param';
import excludeTypeChange from './actions/exclude-type-change';
import includeTypeChange from './actions/include-type-change';
import removeIncludeTag from './actions/remove-include-tag';
import removeExcludeTag from './actions/remove-exclude-tag';
import searchSongCollection from './actions/search-song-collection';

class Songs extends Component {
	render() {
		const { 
			addExcludeParam,
			addExcludeTag,
			addIncludeParam,
			addIncludeTag,
			editSong,
			excludeTypeChange,
			includeTypeChange,
			newExcludeType,
			newIncludeType,
			query,
			removeIncludeTag,
			removeExcludeTag, 
			searchSongs,
			songs } = this.props;
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

		const includeParams = Object.keys(query.include.params).map(param => {
				const { type, ...values } = query.include.params[param];
				return <QueryParam key={param} name={param} type={type} {...values} />
		});
		const excludeParams = Object.keys(query.exclude.params).map(param => {
				const { type, ...values } = query.exclude.params[param];
				return <QueryParam key={param} name={param} type={type} {...values} />
		});
		const includeTags = Object.keys(query.include.tags).map(tag => <Tag key={tag} name={tag} remove={() => removeIncludeTag(tag)} />);
		const excludeTags = Object.keys(query.exclude.tags).map(tag => <Tag key={tag} name={tag} remove={() => removeExcludeTag(tag)} />);
		
		return(
			<div>
				<h1>Your songs!</h1>
				<div>
					<label>Include</label>
					<div className={style['tag-list']}>
						{includeTags}
						<Form className={`pure-form`} onSubmit={addIncludeTag} clearOnSubmit={true}>
							<input type="text" name="tagName" autoComplete="off"/>
							<button>add</button>
						</Form>
					</div>
					{includeParams}
					<Form className={`pure-form`} clearOnSubmit={true} onSubmit={addIncludeParam} onChange={includeTypeChange}>
						<input type="text" name="newParamName"></input>
						<select name="newParamType">
							<option value="is">is</option>
							<option value="exactly">is exactly</option>
							<option value="greater-than">is greater than</option>
							<option value="less-than">is less than</option>
							<option value="between">is between</option>
						</select>
						{(!newIncludeType || newIncludeType === 'is') && <input type="text" name="value1"/>}
						{newIncludeType && newIncludeType !== 'is' && <input type="number" name="value2" step="any"/>}
						{newIncludeType ==='between' && ' and '}
						{newIncludeType === 'between' && <input type="number" name="value3" step="any"/>}
						<button>add</button>
					</Form>
				</div>

				<div>
					<label>Exclude</label>
					<div className={style['tag-list']}>
						{excludeTags}
						<Form className={`pure-form`} onSubmit={addExcludeTag} clearOnSubmit={true}>
							<input type="text" name="tagName" autoComplete="off"/>
							<button>add</button>
						</Form>
					</div>
					{excludeParams}
					<Form className={`pure-form`} clearOnSubmit={true} onSubmit={addExcludeParam} onChange={excludeTypeChange}>
						<input type="text" name="newParamName"></input>
						<select name="newParamType">
							<option value="is">is</option>
							<option value="exactly">is exactly</option>
							<option value="greater-than">is greater than</option>
							<option value="less-than">is less than</option>
							<option value="between">is between</option>
						</select>
						{(!newExcludeType || newExcludeType === 'is') && <input type="text" name="value1"/>}
						{newExcludeType && newExcludeType !== 'is' && <input type="number" name="value2" step="any"/>}
						{newExcludeType ==='between' && ' and '}
						{newExcludeType === 'between' && <input type="number" name="value3" step="any"/>}
						<button>add</button>
					</Form>
				</div>
				<button onClick={searchSongs}>Search your collection!</button>
				<div>
					{songsList}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ 
	songs: { 
		newExcludeType,
		newIncludeType,
		query,
		songs
	} 
}) => ({
	newExcludeType,
	newIncludeType,
	query,
	songs
});

const mapDispatchToProps = (dispatch) => ({
	addParam: (type) => (data) => {console.log(data)},
	addExcludeTag: ({ formData: { tagName } }) => {dispatch(addExcludeTag(tagName))},
	addIncludeTag: ({ formData: { tagName } }) => {dispatch(addIncludeTag(tagName))},
	addExcludeParam: ({ formData }) => {dispatch(addExcludeParam(formData))},
	addIncludeParam: ({ formData }) => {dispatch(addIncludeParam(formData))},
	editSong: data => { console.log(data) },
	excludeTypeChange: ({formData: { newParamType } }) => {dispatch(excludeTypeChange(newParamType))},
	includeTypeChange: ({formData: { newParamType } }) => {dispatch(includeTypeChange(newParamType))},
	removeExcludeTag: (tagName) => {dispatch(removeExcludeTag(tagName))},
	removeIncludeTag: (tagName) => {dispatch(removeIncludeTag(tagName))},
	searchSongs: () => dispatch(searchSongCollection())
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);