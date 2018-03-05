import React from 'react';
import style from './style';

const Tag = ({...props}) => (
	<div className={style.main}>
		<p className={style.name}># {props.name}</p>
		{typeof props.value === 'number' && (
			<div className={style.input_container}>
				<input className={style.value} type="number" name={`#${props.name}`} value={props.value} step="any"/>
			</div>
			)
		}
	</div>
);

export default Tag;