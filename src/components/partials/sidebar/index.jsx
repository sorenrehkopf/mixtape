import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class Sidebar extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};
	}

	toggleMenu = () => {
		const { open } = this.state;

		this.setState({
			open: !open
		});
	}

	render() {
		const { displayName, displayPhoto, logout, pathname } = this.props;
		const { open } = this.state;

		return(
			<div className={`pure-menu ${style.main}`}>
				<div className={style.mobile_toggle}>
					{!open && <span onClick={this.toggleMenu}><i className={`fas fa-bars ${style.toggle_icon}`} /></span>}
					{open && <span onClick={this.toggleMenu}><i className={`fas fa-times ${style.toggle_icon}`} /></span>}
					<span className={style.mobile_logo}>MT</span>
				</div>
				<div className={`${style.menu} ${open ? style.open : ''}`} onClick={this.toggleMenu}>
					<div className={`pure-menu-heading ${style['main__header']}`}>
						<div className={style['main__header--top']}>
							<span className={style['main__header--logo']}>MT</span>
							{displayPhoto && <img className={style['main__header--photo']} src={displayPhoto} />}	
						</div>
						{displayName && <p className={style['main__header--name']}>{displayName}</p>}
					</div>
					<ul className="pure-menu-list">
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${pathname === '/' && style.current}`} to="">Add A Song</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${pathname === '/import' && style.current}`} to="import">Import a Playlist</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${pathname === '/songs' && style.current}`} to="songs">Your Collection</Link>
						</li>
						<li className="pure-menu-item">
							<Link className={`pure-menu-link ${pathname === '/create' && style.current}`} to="create">Create Playlist</Link>
						</li>
						<li className="pure-menu-item">
							<span className="pure-menu-link" onClick={logout}>Logout</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
};

export default Sidebar;