import React, { Component } from 'react';
import style from './style';
import PreviewPlayer from '_/components/partials/preview-player';

class ListItem extends Component {
	render() {
		const { iconName = 'plus', onSelect, songData: { imageUrl, previewUrl, name, artistName, albumName, duration } } = this.props; 
		return (
			<div className={style.main}>
				<PreviewPlayer {...{ imageUrl, previewUrl }}/>
				<div className={style.items} onClick={onSelect}>
					<span className={style['main__add-icon']}>
						<i className={`fas fa-${iconName}`}></i>
					</span>
					<span className={style['main__item']} title={name}>{name}</span>
					<span className={style['main__item']} title={artistName}>{artistName}</span>
					<span className={style['main__item']} title={albumName}>{albumName}</span>
					<span className={`${style['main__item']} ${style.time}`} title={duration.friendly}>{duration.friendly}</span>
				</div>
			</div>
		)
	}
}

export default ListItem;