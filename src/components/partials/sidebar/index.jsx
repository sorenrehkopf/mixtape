import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
	render() {
		const { displayName, displayPhoto, logout } = this.props;
		return(
			<div>
				<img src={displayPhoto} />	
				<p>{displayName}</p>
				<Link to=""><p>Home</p></Link>
				<Link to="songs"><p>Songs</p></Link>
				<button onClick={logout}>Logout!</button>
			</div>
		)
	}
};

export default Sidebar;