import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

import Api from '_/services/api';

const selectSong = (songData) => async(dispatch, getState) => {
	dispatch({ type: SELECT_SONG_START });

	if (songData) {
		const { id } = songData;
		const { data: { song } } = await Api.get(`spotify/song/${id}`);
		const payload = { selectedSong: { ...songData, ...song } };

		dispatch({ type: SELECT_SONG_FINISH, payload });
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
	}
};

export default selectSong;