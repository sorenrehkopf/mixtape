import {
	CREATE_PLAYLIST_START,
	CREATE_PLAYLIST_FINISH
} from './types';

import Api from '_/services/api';

const createPlaylist = (songCriteria) => async(dispatch, getState) => {
	dispatch({ type: CREATE_PLAYLIST_START });

	const { createPlaylist: { playlistData } } = getState();
	const data = { songCriteria, playlistData };
	const { data: payload } = await Api.post('playlists', data);

	dispatch({ type: CREATE_PLAYLIST_FINISH, payload });
};

export default createPlaylist;