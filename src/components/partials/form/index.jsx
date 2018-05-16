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
		console.log('submitting!!');
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
				// dispatch an input event so that any listeners will respond
				if (element.type == 'text') {
					nativeInputValueSetter.call(element, '');
				}

				if (element.type == 'number') {
					element.value = '';
				}

				if (element.type != 'checkbox') {
					const event = new Event('input', { bubbles: true });
		  	 	element.dispatchEvent(event);
				}
			}
		}
	}

	handleInput = ({ target }) => {
		console.log('changing');
		const { name, value, type } = target;
		const { props: { onChange }, state: { formData } } = this;
		const delta = {};
		if (!name) return; 
		const transformedValue = target.getAttribute('uppercase') ? value.toUpperCase() : value;
		delta[name] = target.getAttribute('type') == 'text' ? transformedValue : parseFloat(value);
		
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

	// currently have a separate handler for change since checkboxes to not recognize a click
	// as an input, yet the onChange handler doesn't recognize when the autocomplete component
	// programatically sets the value for a text input field, yet the onInput handler does. 
	handleChange = ({ target }) => {
		const { name, value, type } = target;
		const { props: { onChange }, state: { formData } } = this;
		const delta = {};
		if (!name || type != 'checkbox') return;

		delta[name] = !formData[name]
		
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
			<form id={id} ref="form" className={className} onChange={this.handleChange} onInput={this.handleInput} onSubmit={this.handleSubmit}>
				{children}
			</form>
		)
	}
}

export default Form;