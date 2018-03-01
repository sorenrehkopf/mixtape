import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import Form from '_/components/partials/form';
import PreviewPlayer from '_/components/partials/preview-player';
import Tag from '_/components/partials/tag';

import updateSongData from '_/components/dashboard/actions/update-song-data';

import style from './style';

class AddSongDialog extends Component {
	render() {
		const { addSong, selectedSong: { 
			albumName,
			artistName,
			duration,
			energy,
			key,
			danceability,
			tempo,
			valence,
			loudness,
			imageUrl,
			name,
			previewUrl,
			tags,
			...restOfSong 
		}, updateSongData } = this.props;
		console.log(tags);
		const values = { energy, tempo, key, valence, danceability, loudness };
		const defaultInputs = Object.keys(values).map(key => (
			<div key={key} className={`pure-control-group ${style.input_container}`}>
				<label className={style.label}>{key}: </label>
				<input className={`pure-input ${style.input}`} type={typeof values[key] === 'number' ? 'number' : 'text'} step="any" name={key} value={values[key]}/>
			</div>
		));

		const tagElements = Object.keys(tags).map(key => (<Tag name={key} value={tags[key]} />));

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
						<span className={style.info__item}>{duration}</span>
					</div>
				</div>
				<p className={style.data_label}>Data: </p>
				<p className={style.disclaimer}><em>** Pre-populated values are taken from the availabile spotify audio analysis. They are by no means perfect. Please adjust.**</em></p>
				<Form onSubmit={addSong} onChange={updateSongData} className={`pure-form ${style.form}`}>
					<div className={style.input_group}>
						{defaultInputs}
					</div>
					<div className={style.input_group}>
						{tagElements}
						<button className={`pure-button ${style.tagButton}`}><i className="fas fa-plus"/> add a tag!</button>
					</div>
					<button className={`pure-button ${style.button}`}>Add song!</button>
				</Form> 
			</div>
		)
	}
}

const mapStateToProps = ({ dashboard: { selectedSong } }) => ({
	selectedSong
});

const mapDispatchToProps = (dispatch) => ({
	addSong: (event) => {console.log(event)},
	updateSongData: ({ delta }) => dispatch(updateSongData(delta))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongDialog);