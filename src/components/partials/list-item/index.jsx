import React, { Component } from 'react';
import formatTime from '_/services/formatTime';
import style from './style';
import PreviewPlayer from '_/components/partials/preview-player';

class ListItem extends Component {
	render() {
		const { imageUrl, previewUrl, name, artistName, albumName, duration, onSelect } = this.props; 
		const formattedTime = formatTime(duration);
		return (
			<div className={style.main}>
				<PreviewPlayer {...{ imageUrl, previewUrl }}/>
				<span className={style['main__add-icon']} onClick={onSelect}>
					<i className="fas fa-plus"></i>
				</span>
				<span className={style['main__item']} title={name}>{name}</span>
				<span className={style['main__item']} title={artistName}>{artistName}</span>
				<span className={style['main__item']} title={albumName}>{albumName}</span>
				<span className={style['main__item']} title={formattedTime}>{formattedTime}</span>
			</div>
		)
	}
}

export default ListItem;