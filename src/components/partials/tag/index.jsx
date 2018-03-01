import React from 'react';
import style from './style';

const Tag = ({...props}) => (
	<div>
		<p>{props.name}</p>
		{typeof props.value === 'number' && <input type="number" name={`#${props.name}`} value={props.value}/>}
	</div>
);

export default Tag;