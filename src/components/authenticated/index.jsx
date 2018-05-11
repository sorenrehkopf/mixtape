import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import style from './style';

import Sidebar from '../partials/sidebar';
import Modal from '../partials/modal';
import AddSongDialog from '../partials/add-song-dialog';

import Dashboard from '../dashboard';
import Songs from '../songs';
import CreatePlaylist from '../create-playlist';

import logout from'./actions/logout';
import selectSong from '_/components/dashboard/actions/select-song';

class Authenticated extends Component {
	render() {
		const { authenticated, currentRoute, currentUser, location, logout, selectedSong, selectSong } = this.props;

		if (!authenticated) {
			return <Redirect to="/login" />;
		}

		const { displayName, displayPhoto } = currentUser;
		const { pathname } = location;

		return(<div className={style.main}>
			<Sidebar {...{ displayName, displayPhoto, logout, pathname }}  />
			<div className={style.scene}>
				<Switch>
					<Route path="/" exact component={Dashboard} />
					<Route path="/songs" exact component={Songs} />
					<Route path="/create" exact component={CreatePlaylist} />
					<Redirect to={{ pathname: '/', state: { from: this.props.location }}} />
				</Switch>
				{selectedSong && (
					<Modal onBackgroundClick={() => selectSong()}>
						<AddSongDialog />
					</Modal>
				)}
			</div>
		</div>)
	}
}

const mapStateToProps = ({ main: { authenticated, currentUser, error, selectedSong }, router: { location } }) => ({
	authenticated,
	currentUser,
	error,
	location,
	selectedSong
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
	selectSong: () => dispatch(selectSong())
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticated);