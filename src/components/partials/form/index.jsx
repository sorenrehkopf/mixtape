import React, { Component, Children } from 'react';

class Form extends Component {
	componentDidMount() {
		const nameElements = this.refs.form.querySelectorAll('[name]')
		const formData = {};

		for (let { name, value } of nameElements) {
			formData[name] = value;
		}

		this.setState({
			formData,
			nameElements
		});
	}

	handleSubmit = (e) => {
		const { props: { clearOnSubmit, onSubmit }, state: { formData, nameElements } } = this;
		e.preventDefault();
		if (onSubmit) {
			onSubmit({ formData });
		}
		if (clearOnSubmit) {
			const clearedFormData = {};
			for (let key in formData) {
				clearedFormData[key] = null;
			};
			this.setState({
				formData: clearedFormData
			});
			for (let element of nameElements) {
				element.value = null;
			}
		}
	}

	handleChange = ({ target: { name, value } }) => {
		const { props: { onChange }, state: { formData } } = this;
		const delta = {};
		if (!name) return; 

		delta[name] = isNaN(value) ? value : parseFloat(value);
		
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
		const { children, className, id } = this.props;
		return(
			<form id={id} ref="form" className={className} onChange={this.handleChange} onSubmit={this.handleSubmit}>
				{children}
			</form>
		)
	}
}

export default Form;