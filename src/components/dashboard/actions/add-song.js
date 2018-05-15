import {
	ADD_SONG_FINISH,
	ADD_SONG_START
} from './types';

import {
	SLOW_IMPORT_FINISH
} from '_/components/import-playlists/actions/types';

import Api from '_/services/api';
import { convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

import selectSong from '_/components/dashboard/actions/select-song';

const addSong = () => async(dispatch, getState) => {
	const { main: { selectedSong, importQueue } } = getState();
	
	dispatch({ type: ADD_SONG_START });

	for (let tag in selectedSong.tags) {
		if (selectedSong.tags[tag] === false) {
			delete selectedSong.tags[tag];
		}
	};

	const { data: addedSongData } = await Api.post('songs', selectedSong);

	dispatch({ type: ADD_SONG_FINISH, payload: { addedSongData } });

	if (importQueue[0] && selectedSong.spotifyId == importQueue[0].spotifyId) {
		importQueue.shift();
	}

	const nextSong = importQueue[0];
	
	if (nextSong) {
		dispatch(selectSong(nextSong, true));
		dispatch({ type: SLOW_IMPORT_FINISH, payload: { tracks: importQueue } });
	}
};

export default addSong;