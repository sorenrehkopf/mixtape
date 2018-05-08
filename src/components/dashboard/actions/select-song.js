import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

import Api from '_/services/api';
import { convertDBTags, convertFromSpotify } from '_/services/transform-song-data';

const selectSong = (songData, shouldLoad) => async(dispatch, getState) => {
	dispatch({ type: SELECT_SONG_START });
	if (songData) {
		// if we don't need to load the data for this song than just set it directly
		if (!shouldLoad) {
			return dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: songData } });
		}

		const { id } = songData;
		const data = {
			include: { 
				params: { 
					spotifyId: {
						type: 'strict_equivalence',
						value0: id
					}
				},
				tags: {}
			},
			exclude: { params: {}, tags: {}}
		};
		
		let { data: { songs: [song] } } = await Api.get(`songs/search/${encodeURIComponent(JSON.stringify(data))}`);
		let payload = { selectedSong: song };

		if (!song) {
			song = await Api.get(`spotify/song/${id}`).then(({ data: { song } }) => song);
			const transformedSongData = convertFromSpotify(song);
			payload = { selectedSong: { ...songData, ...transformedSongData } };
		}

		dispatch({ type: SELECT_SONG_FINISH, payload });
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
	}
};

export default selectSong;