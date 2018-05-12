import {
	CREATE_PLAYLIST_START,
	CREATE_PLAYLIST_FINISH
} from './types';

import Api from '_/services/api';

const createPlaylist = (songCriteria) => async(dispatch, getState) => {
	const { createPlaylist: { playlistData } } = getState();
	dispatch({ type: CREATE_PLAYLIST_START });

	const data = { songCriteria, playlistData };
	console.log('creating the playlist!', data);
	const resp = await Api.post('playlists', data);
	console.log('the resp!', resp);
	dispatch({ type: CREATE_PLAYLIST_FINISH, payload: resp });
};

export default createPlaylist;