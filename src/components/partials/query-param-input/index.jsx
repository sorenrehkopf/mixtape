import React, { Component } from 'react';
import Form from '_/components/partials/form';
import style from './style';

import { paramTypes } from '_/services/get-collections';

import Autocomplete from '_/components/partials/autocomplete';

class QueryParamInput extends Component {
	constructor() {
		super();
		this.state = {
			newParamType: 'loose_equivalence'
		};
	}

	updateParamType(newType) {
		if (newType && newType !== this.state.newParamType) {
			this.setState({
				newParamType: newType
			});
		}
	}

	render() {
		const { props: { queryParamAddAction, options }, state: { newParamType } } = this;

		const typeOptions = Object.keys(paramTypes).map(type => <option key={type} value={type}>{paramTypes[type].displayValue}</option>);
		const typeInputs = paramTypes[newParamType].inputTypes.map((type, i) => <input required key={i} className={style.input} type={type} name={`value${i}`} step="any" />);
		return(
			<Form className={`pure-form ${style.form}`} clearOnSubmit={true} onSubmit={queryParamAddAction} onChange={({ formData: { newParamType } }) => this.updateParamType(newParamType)}>
				<Autocomplete name="newParamName" className={`pure-input ${style.input}`} options={options} />
				<select required type="text" className={style.input} name="newParamType">
					{typeOptions}
				</select>
				{typeInputs}
				<button className={`${style['add-button']} ${style.input} pure-button`}>add</button>
			</Form>
		)
	}
}

export default QueryParamInput;