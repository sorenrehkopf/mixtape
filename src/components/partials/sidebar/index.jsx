import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import style from './style';

class Sidebar extends Component {
	render() {
		const { displayName, displayPhoto, logout, pathname } = this.props;
		return(
			<div className={`pure-menu ${style.main}`}>
				<div className={`pure-menu-heading ${style['main__header']}`}>
					<div className={style['main__header--top']}>
						<span className={style['main__header--logo']}>MT</span>
						{displayPhoto && <img className={style['main__header--photo']} src={displayPhoto} />}	
					</div>
					{displayName && <p className={style['main__header--name']}>{displayName}</p>}
				</div>
				<ul className="pure-menu-list">
					<li className="pure-menu-item">
						<Link className={`pure-menu-link ${pathname === '/' && style.current}`} to="">Home</Link>
					</li>
					<li className="pure-menu-item">
						<Link className={`pure-menu-link ${pathname === '/songs' && style.current}`} to="songs">Songs</Link>
					</li>
					<li className="pure-menu-item">
						<span className="pure-menu-link" onClick={logout}>Logout</span>
					</li>
				</ul>
			</div>
		)
	}
};

export default Sidebar;