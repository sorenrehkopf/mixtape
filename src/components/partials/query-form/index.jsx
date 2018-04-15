import React, { Component } from 'react';
import Form from '_/components/partials/form';
import Tag from '_/components/partials/tag';
import QueryParam from '_/components/partials/query-param';
import style from './style';

import QueryParamInput from '_/components/partials/query-param-input';

class QueryForm extends Component {
	constructor() {
		super();
		this.state = {
			exclude: {
				params: {},
				tags: {}
			},
			include: {
				params: {},
				tags: {}
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

	handleSubmit() {
		const { props: { onSubmit }, state: { exclude, include } } = this;

		onSubmit({ exclude, include });
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
					<div className={style['tag-list']}>
						{includeTags}
						<Form className={`pure-form`} onSubmit={({ formData: { tagName }}) => this.add('include', 'tags', tagName)} clearOnSubmit={true}>
							<input type="text" name="tagName" autoComplete="off"/>
							<button className={`pure-button ${style['add-button']}`}>add</button>
						</Form>
					</div>
					{includeParams}
					<QueryParamInput queryParamAddAction={({ formData: { newParamName, ...param } }) => this.add('include', 'params', newParamName, param)} />
				</div>

				<div>
					<label className={style['section-title']}>Exclude</label>
					<div className={style['tag-list']}>
						{excludeTags}
						<Form className={`pure-form`} onSubmit={({ formData: { tagName }}) => this.add('exclude', 'tags', tagName)} clearOnSubmit={true}>
							<input type="text" name="tagName" autoComplete="off"/>
							<button className={`pure-button ${style['add-button']}`}>add</button>
						</Form>
					</div>
					{excludeParams}
					<QueryParamInput queryParamAddAction={({ formData: { newParamName, ...param } }) => this.add('exclude', 'params', newParamName, param)} />
				</div>
				<button className={`pure-button ${style['submit-button']}`} onClick={() => this.handleSubmit()}>Search your collection!</button>
			</div>
		)
	}
}


export default QueryForm;