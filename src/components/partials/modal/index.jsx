import React, { Component } from 'react';
import style from './style';

class Modal extends Component {
	render() {
		const { children, onBackgroundClick } = this.props;
		return(
			<div className={style.main} onClick={onBackgroundClick}>
				{children}
			</div>
		)
	}
}

export default Modal;