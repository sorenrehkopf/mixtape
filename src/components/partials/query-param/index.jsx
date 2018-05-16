import React, { Component } from 'react';
import style from './style';

import { paramTypes } from '_/services/get-collections';

class QueryParam extends Component {
	render() {
		const { name, remove, type, ...values } = this.props;
		
		return (
			<div className={style.main}>
				<span className={style.name}>
					<span>{name}</span>
					<span> {paramTypes[type].displayValue} </span>
					{paramTypes[type].inputTypes.map((type, i) => <span key={i}>{i ? ' and ' : null}{values[`value${i}`]}</span>)}
				</span>
				<span className={style.remove} onClick={remove}>x</span>
			</div>
		)
	}
}

export default QueryParam;