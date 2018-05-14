import React, { Component } from 'react';
import style from './style';

class ListItem extends Component {
	get smallestImageUrl() {
		const { playlist: { images } } = this.props

		if (!images.length) {
			return null;
		}

		return images[images.length - 1].url;
	}

	render() {
		const { 
			props: {
				playlist: { 
					name,
					id,
					tracks: {
						total
					}
				},
				onSelect
			},
			smallestImageUrl
		} = this; 
		return (
			<div className={style.main}>
				{smallestImageUrl && <img src={smallestImageUrl} className={style.image} />}
				<div className={style.items} onClick={onSelect}>
					<span className={style['main__add-icon']}>
						<i className={`fas fa-plus`}></i>
					</span>
					<span className={style['main__item']} title={name}>{name}</span>
					<span className={style['main__item']} title={`${total} songs`}>{`${total} songs`}</span>
				</div>
			</div>
		)
	}
}

export default ListItem;