import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

import Api from '_/services/api';
import transformSongData from '_/services/transform-song-data';

const selectSong = (songData) => async(dispatch, getState) => {
	dispatch({ type: SELECT_SONG_START });

	if (songData) {
		const { id } = songData;
		const { data: { song } } = await Api.get(`spotify/song/${id}`);
		const transformedSongData = transformSongData(song);
		const payload = { selectedSong: { ...songData, ...transformedSongData } };
		console.log(JSON.stringify(payload));
		dispatch({ type: SELECT_SONG_FINISH, payload });
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
	}
};

export default selectSong;