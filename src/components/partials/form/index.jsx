import React, { Component, Children } from 'react';

class Form extends Component {
	constructor({ children }) {
		super();
		const formData = {};
		const flattenedChildren = this.getFlattenedChildren(Children.toArray(children));
		for(let { props: { name, value } } of flattenedChildren) {
			if (name) {
				formData[name] = value;
			}
		}
		console.log(formData);
		this.state = {
			formData
		}
	}

	getFlattenedChildren = (children) => {
		const { getFlattenedChildren } = this;
		let flattened = [];

		for(let child of children) {
			if (child.props && child.props.children) {
				if (Array.isArray(child.props.children)) {
					flattened = [...flattened, ...child.props.children]					
				} else {
					flattened = [...flattened, child];
				}
			}
		}

		return flattened;
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