import React, { Component } from 'react';

class Form extends Component {
	constructor({ children }) {
		super();
		const formData = {};
		console.log(children);
		if (children.length) {
			for(let { props: { name, value } } of children) {
				if (name) {
					formData[name] = value;
				}
			}
		} else {
			const { props: { name, value } } = children;
			formData[name] = value;
		}
		this.state = {
			formData
		}
	}



	handleSubmit = (e) => {
		const { props: { onSubmit }, state: { formData } } = this;
		e.preventDefault();
		if (onSubmit) {
			onSubmit({ formData });
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const { props: { onChange }, state: { formData } } = this;
		const delta = {};

		delta[name] = value;
		
		this.setState({ 
			formData: {
				...formData,
				...delta
			}
		}, () => {
			const { formData } = this.state;
			if (onChange) {
				onChange({ formData, delta });
			}
		});
	}

	render() {
		const { children, className } = this.props;
		return(
			<form className={className} onChange={this.handleChange} onSubmit={this.handleSubmit}>
				{children}
			</form>
		)
	}
}

export default Form;