import React, { Component } from 'react';

class QueryParam extends Component {
	render() {
		const { name, type, value1, value2, value3 } = this.props;
		return (
			<div>
				<span>{name}</span>
				<span> {type} </span>
				{type === 'is' && <span>{value1}</span>}
				{type !== 'is' && <span>{value2}</span>}
				{type === 'between' && <span> and {value3}</span>}
			</div>
		)
	}
}

export default QueryParam;