import {
	LOAD_PLAYLISTS_START,
	LOAD_PLAYLISTS_FINISH
} from './types';

import Api from '_/services/api';

const loadPlaylists = () => async(dispatch, getState) => {
	dispatch({ type: LOAD_PLAYLISTS_START });

	const { data: { items }} = await Api.get('spotify/playlists');
	const payload = { playlists: items };
	
	dispatch({ type: LOAD_PLAYLISTS_FINISH, payload });
}

export default loadPlaylists;
