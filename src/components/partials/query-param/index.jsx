import React, { Component } from 'react';
import style from './style';

class QueryParam extends Component {
	render() {
		const { name, remove, type, value1, value2, value3 } = this.props;
		return (
			<div className={style.main}>
				<span className={style.name}>
					<span>{name}</span>
					<span> {type} </span>
					{type === 'is' && <span>{value1}</span>}
					{type !== 'is' && <span>{value2}</span>}
					{type === 'between' && <span> and {value3}</span>}
				</span>
				<span className={style.remove} onClick={remove}>x</span>
			</div>
		)
	}
}

export default QueryParam;