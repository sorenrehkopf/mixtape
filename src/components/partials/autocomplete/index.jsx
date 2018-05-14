import React, { Component } from 'react';
import style from './style';

class Autocomplete extends Component {
	constructor() {
		super();
		this.state = {
			currentIdx: 0,
			hideOptions: false,
			value: ''
		};
	}

	getMatches() {
		const { props: { options }, state: { value } } = this;
		const valueRegex = new RegExp(value, 'i');

		return options.filter(option => valueRegex.test(option.name))
			.sort((a,b) => a.name.length - b.name.length);
	}

	handleChange = ({ target: { value }}) => {
		this.setState({ value: value.toUpperCase() });
	}

	onKeyDown = (e) => {
		const { key } = e;
		const { currentIdx, hideOptions } = this.state;
		const matches = this.getMatches();
		
		if(key == 'Enter' && !hideOptions && matches.length) {
			e.preventDefault();

			const value = matches[currentIdx].name;

			this.select(value);
		} else if (key == 'Enter') {
			this.setState({
				value: ''
			});
		} else if (key != 'Enter' && key != 'Tab' && hideOptions) {
			this.setState({
				hideOptions: false,
				currentIdx: 0
			});
		} else if (key == 'ArrowDown' && currentIdx < matches.length -1) {
			this.setState({
				currentIdx: currentIdx + 1
			});
		} else if (key == 'ArrowUp' && currentIdx) {
			this.setState({
				currentIdx: currentIdx - 1
			});
		}
	}

	onBlur = () => {
		this.setState({
			hideOptions: true
		});
	}

	select = (value) => {
		const { input } = this.refs;

		this.setState({
			hideOptions: true,
			value
		}, () => {
			const event = new Event('input', { bubbles: true });
  	  input.dispatchEvent(event);
		});

		input.focus();
	}

	render() {
		const { props: { autofocus, name, options, classname }, handleChange, state: { currentIdx, hideOptions, value } } = this;
		const matches = this.getMatches().map((option, i) => 
			<span key={i} className={`${style.option} ${currentIdx == i ? style.current : ''}`} onClick={() => this.select(option.name)}>{option.name}</span>);

		return(
			<div className={style.main}>
				<input autoFocus={autofocus} type="text" onBlur={this.onBlur} ref="input" autoComplete="off" uppercase="true" onKeyDown={this.onKeyDown} name={name} value={value} className={classname} onChange={this.handleChange} />
				{value && !hideOptions && <div className={style.options}>
					{matches}
				</div>}
			</div>
		)
	}
}

export default Autocomplete;