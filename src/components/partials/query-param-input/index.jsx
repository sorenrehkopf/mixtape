import React, { Component } from 'react';
import Form from '_/components/partials/form';
import style from './style';

class QueryParamInput extends Component {
	constructor() {
		super();
		this.state = {
			newParamType: 'is'
		};
	}

	updateParamType(newType) {
		if (newType !== this.state.newParamType) {
			this.setState({
				newParamType: newType
			});
		}
	}

	render() {
		const { props: { queryParamAddAction }, state: { newParamType } } = this;

		return(
			<Form className={`pure-form`} clearOnSubmit={true} onSubmit={queryParamAddAction} onChange={({ formData: { newParamType } }) => this.updateParamType(newParamType)}>
				<input className={style.input} type="text" name="newParamName"></input>
				<select className={style.input} name="newParamType">
					<option value="is">is</option>
					<option value="exactly">is exactly</option>
					<option value="greater-than">is greater than</option>
					<option value="less-than">is less than</option>
					<option value="between">is between</option>
				</select>
				{newParamType === 'is' && <input className={style.input} type="text" name="value1"/>}
				{newParamType !== 'is' && <input className={style.input} type="number" name="value2" step="any"/>}
				{newParamType ==='between' && ' and '}
				{newParamType === 'between' && <input className={style.input} type="number" name="value3" step="any"/>}
				<button className={`${style['add-button']} ${style.input} pure-button`}>add</button>
			</Form>
		)
	}
}

export default QueryParamInput;