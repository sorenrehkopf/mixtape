import React, { Component } from 'react';
import style from './style';

class PreviewPlayer extends Component {
	constructor() {
		super();
		this.state = {
			playing: false
		}
	}

	componentDidUpdate(prevProps) {
		const { refs: { audio }, props: { previewUrl } } = this;

		if (audio && previewUrl != prevProps.previewUrl) {
			audio.pause();
			audio.load();
			this.setState({
				playing: false
			});
		}
	}

	toggle = ({ currentTarget }) => {
		const { audio } = this.refs;

		if (!audio) {
			return;
		}

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
		const { className, imageUrl, previewUrl } = this.props;
		const { playing } = this.state;
		return (
			<div className={`${style.main} ${className}`} onClickCapture={this.toggle}>
				<img className={style['main__image']} src={imageUrl} title={previewUrl ? 'Click to play preview' : 'No preview available'}/>
				{previewUrl && 
					<span className={style['main__icon']}>
						{playing && <span><i className="fas fa-pause"></i></span>}
						{!playing && <span><i className="fas fa-play"></i></span>}
					</span>
				}
				{previewUrl &&
					<audio ref="audio">
						<source src={previewUrl} type="audio/mpeg"/>
					</audio>
				}
			</div>
		)
	}
};

export default PreviewPlayer;