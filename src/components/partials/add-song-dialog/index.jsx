import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Form from '_/components/partials/form';
import PreviewPlayer from '_/components/partials/preview-player';
import Tag from '_/components/partials/tag';

import addSong from '_/components/dashboard/actions/add-song';
import updateSongData from '_/components/dashboard/actions/update-song-data';

import style from './style';

class AddSongDialog extends Component {
	render() {
		console.log(this.props.selectedSong);
		const { addSong, addTag, removeTag, selectedSong: { 
			albumName,
			artistName,
			danceability,
			duration,
			energy,
			imageUrl,
			key,
			loudness,
			name,
			previewUrl,
			tags,
			tempo,
			timeSignature,
			valence,
			...restOfSong 
		}, updateSongData } = this.props;
		const values = { energy, tempo, key, valence, danceability, loudness, timeSignature };
		const defaultInputs = Object.keys(values).map(key => <Tag key={key} name={key} value={values[key]} />);
		const tagInputs = Object.keys(tags).map(key => <Tag key={key} name={`#${key}`} value={tags[key]} remove={() => removeTag(key)} />);
		const inputs = [...defaultInputs, ...tagInputs];

		return(
			<div className={style.main}>
				<h2 className={style.header}>Adding song</h2>
				<div className={style.info}>
					<span className={style.info__item}><em>{name}</em> <span>by</span> </span>
					<span className={`${style.info__item} ${style.small}`}>{artistName} <span>from</span> </span>
					<span className={style.info__item}><em>{albumName}</em></span>
					<br/>
					<br/>
					<div className={style.player_and_time}>
						<PreviewPlayer className={style.player} {...{ imageUrl, previewUrl} } />
						<span className={style.info__item}>{duration.friendly}</span>
					</div>
				</div>
				<p className={style.data_label}>Data: </p>
				<p className={style.disclaimer}><em>** Pre-populated values are taken from the availabile spotify audio analysis. They are by no means perfect. Please adjust.**</em></p>
				<Form id="add-song-form" onSubmit={addSong} onChange={updateSongData} className={`pure-form ${style.form}`}>
					<div className={style.input_group}>
						{inputs}
					</div>
				</Form> 
				<Form className={`pure-form ${style.new_tag_form}`} onSubmit={addTag}>
					<input name="newTagName" type="text" className={`pure-input ${style.input}`} />
					<div>
						<label className={`pure-radio ${style.tag_type_radio}`}>
							<input type="radio" name="newTagType" value="boolean"/>
							  Boolean
						</label>
						<label className={`pure-radio ${style.tag_type_radio}`}>
							<input type="radio" name="newTagType" value="numeric" />
							  Numeric
						</label>
					</div>
					<button className={`pure-button ${style.tag_button}`}><i className="fas fa-plus"/> add a tag!</button>
				</Form>
				<button form="add-song-form" type="submit" className={`pure-button ${style.button}`}><i className="fas fa-plus"/> Add song!</button>
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { selectedSong } }) => ({
	selectedSong
});

const mapDispatchToProps = (dispatch) => ({
	addSong: () => dispatch(addSong()),
	addTag: ({ formData: { newTagName, newTagType } }) => {
		console.log(newTagName, newTagType);
		const update = {};
		update[`#${newTagName}`] = newTagType === 'numeric' ? 5 : true;
		dispatch(updateSongData(update))
	},
	removeTag: tagName => {
		const update = {};
		update[`#${tagName}`] = false;
		dispatch(updateSongData(update))
	},
	updateSongData: ({ delta }) => dispatch(updateSongData(delta))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongDialog);