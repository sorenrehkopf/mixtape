import React, { Component } from 'react';
import Form from '_/components/partials/form';
import Tag from '_/components/partials/tag';
import QueryParam from '_/components/partials/query-param';
import style from './style';

import QueryParamInput from '_/components/partials/query-param-input';
import Autocomplete from '_/components/partials/autocomplete';

class QueryForm extends Component {
	constructor() {
		super();
		this.state = {
			exclude: {
				params: {},
				paramsExclusive: true,
				tags: {},
				tagsExclusive: false
			},
			include: {
				params: {},
				paramsExclusive: true,
				tags: {},
				tagsExclusive: false
			}
		}
	}

	add(which, type, name, data) {
		const { state } = this;
		const delta = state[which][type];
		const update = {};

		if (type === 'params') {
			const { newParamType: type, ...values } = data;
			delta[name] = { type, ...values };
		} else {
			delta[name] = true;
		}

		update[which] = {
			...state[which]
		};
		update[which][type] = delta;

		this.setState(update);
	}

	toggleExclusive = (which, type) => {
		const { state } = this;
		const update = {};
		const key = `${type}Exclusive`;

		update[which] = {
			...state[which]
		};

		update[which][key] = !state[which][key];

		this.setState(update);
	}

	handleSubmit() {
		const { props: { onSubmit }, state: { exclude, include } } = this;

		try {
			onSubmit({ exclude, include });

			this.setState({
				exclude: {
					params: {},
					paramsExclusive: true,
					tags: {},
					tagsExclusive: false
				},
				include: {
					params: {},
					paramsExclusive: true,
					tags: {},
					tagsExclusive: false
				}
			});
		} catch (error) {
			// the submit action couldn't complete for some reason
			console.error(error);	
		}
	}

	remove(which, type, name) {
		const { state } = this;
		const delta = state[which];
		const update = {};

		delete delta[type][name];

		update[which] = delta;

		this.setState(update);
	}

	render() {
		const {
			exclude,
			include
		} = this.state;
		const { options, tags, submitText = 'Search your collection!' } = this.props;

		const includeParams = Object.keys(include.params).map(param => {
				const { type, ...values } = include.params[param];
				return <QueryParam key={param} name={param} type={type} {...values} remove={() => this.remove('include', 'params', param)} />
		});
		const excludeParams = Object.keys(exclude.params).map(param => {
				const { type, ...values } = exclude.params[param];
				return <QueryParam key={param} name={param} type={type} {...values} remove={() => this.remove('exclude', 'params', param)} />
		});
		const includeTags = Object.keys(include.tags).map(tag => <Tag key={tag} name={tag} remove={() => this.remove('include', 'tags', tag)} />);
		const excludeTags = Object.keys(exclude.tags).map(tag => <Tag key={tag} name={tag} remove={() => this.remove('exclude', 'tags', tag)} />);
		
		return(
			<div>
				<div className={style.include}>
					<label className={style['section-title']}>Include</label>
					<form className={`pure-form ${style.exclusive_toggle}`}>
						<label className={`pure-checkbox ${style.toggle_label}`} title="'and' instead of 'or' for tags">
							<input type="checkbox" onChange={() => this.toggleExclusive('include', 'tags')} />
							tags exclusive
						</label>
					</form>
					<form className={`pure-form ${style.exclusive_toggle}`}>
						<label className={`pure-checkbox ${style.toggle_label}`} title="'and' instead of 'or' for params">
							<input type="checkbox" checked={include.paramsExclusive} onChange={() => this.toggleExclusive('include', 'params')} />
							params exclusive
						</label>
					</form>
					<div className={style['tag-list']}>
						{includeTags}
						<Form className={`pure-form ${style.include_form}`} onSubmit={({ formData: { tagName }}) => this.add('include', 'tags', tagName)} clearOnSubmit={true}>
							<Autocomplete name="tagName" className={`pure-input ${style.input}`} options={tags} />
							<button className={`pure-button ${style['add-button']}`}>add</button>
						</Form>
					</div>
					{includeParams}
					<QueryParamInput options={options} queryParamAddAction={({ formData: { newParamName, ...param } }) => this.add('include', 'params', newParamName, param)} />
				</div>

				<div>
					<label className={style['section-title']}>Exclude</label>
					<form className={`pure-form ${style.exclusive_toggle}`}>
						<label className={`pure-checkbox ${style.toggle_label}`} title="'and' instead of 'or' for tags">
							<input type="checkbox" onChange={() => this.toggleExclusive('exclude', 'tags')} />
							tags exclusive
						</label>
					</form>
					<div className={style['tag-list']}>
						{excludeTags}
						<Form className={`pure-form ${style.include_form}`} onSubmit={({ formData: { tagName }}) => this.add('exclude', 'tags', tagName)} clearOnSubmit={true}>
							<Autocomplete name="tagName" className={`pure-input ${style.input}`} options={tags} />
							<button className={`pure-button ${style['add-button']}`}>add</button>
						</Form>
					</div>
				</div>
				<button className={`pure-button ${style['submit-button']}`} onClick={() => this.handleSubmit()}>{submitText}</button>
			</div>
		)
	}
}


export default QueryForm;