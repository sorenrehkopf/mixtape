import React, { Component, Children } from 'react';

// setting element.value does not work for elements rendered by react
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

class Form extends Component {
	componentDidMount() {
		const nameElements = this.refs.form.querySelectorAll('[name]')
		const formData = {};

		for (let { name, value, type } of nameElements) {
			if (type == 'checkbox') {
				formData[name] = false;
				continue;
			}

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
				if (element.type != 'checkbox') {
					const value = element.type === 'text' ? '' : null;
					nativeInputValueSetter.call(element, value);
					// dispatch an input event so that any listeners will respond
					const event = new Event('input', { bubbles: true });
	  	  	element.dispatchEvent(event);
				}
			}
		}
	}

	handleChange = ({ target }) => {
		const { name, value, type } = target;
		const { props: { onChange }, state: { formData } } = this;
		const delta = {};
		if (!name) return; 

		const transformedValue = target.getAttribute('uppercase') ? value.toUpperCase() : value;

		if (type == 'checkbox') {
			delta[name] = !formData[name]
		} else {
			delta[name] = isNaN(value) ? transformedValue : parseFloat(value);
		}
		
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