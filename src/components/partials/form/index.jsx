import React, { Component, Children } from 'react';

class Form extends Component {
	componentDidMount() {
		const nameElements = this.refs.form.querySelectorAll('[name]')
		const formData = {};

		for (let { name, value } of nameElements) {
			formData[name] = value;
		}

		this.setState({
			formData
		});
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
			console.log('the form data!', formData);
			if (onChange) {
				onChange({ formData, delta });
			}
		});
	}

	render() {
		const { children, className } = this.props;
		return(
			<form ref="form" className={className} onChange={this.handleChange} onSubmit={this.handleSubmit}>
				{children}
			</form>
		)
	}
}

export default Form;