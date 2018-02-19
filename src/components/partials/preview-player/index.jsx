import React, { Component } from 'react';
import style from './style';

class PreviewPlayer extends Component {
	constructor() {
		super();
		this.state = {
			playing: false
		}
	}

	toggle(currentTarget) {
		const audio = currentTarget.parentElement.querySelector('audio');
		if (audio.paused) {
			audio.play();
			this.setState({
				playing: true
			});
		} else {
			this.setState({
				playing: false
			});
			audio.pause();
		}
	}

	render() {
		const { imageUrl, previewUrl } = this.props;
		const { playing } = this.state;
		return (
			<div className={style.main} onClickCapture={({ currentTarget }) => this.toggle(currentTarget)}>
				<img className={style['main__image']} src={imageUrl}/>
				<span className={style['main__icon']}>
					{playing && <span><i className="fas fa-pause"></i></span>}
					{!playing && <span><i className="fas fa-play"></i></span>}
				</span>
				<audio>
					<source src={previewUrl} type="audio/mpeg"/>
				</audio>
			</div>
		)
	}
};

export default PreviewPlayer;