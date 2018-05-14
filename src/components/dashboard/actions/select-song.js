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
			const selectedSong = {
				...songData,
				duration: {
					friendly: songData.durationFriendly,
					ms: songData.durationMs
				}
			};
			return dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: songData, isSelectedSongNew: false } });
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
				tags: {},
			},
			exclude: { params: {}, tags: {}}
		};
		
		let { data: { songs: [song] } } = await Api.get(`songs/search/${encodeURIComponent(JSON.stringify(data))}`);
		let payload;
		if (!song) {
			song = await Api.get(`spotify/song/${id}`).then(({ data: { song } }) => song);
			const transformedSongData = convertFromSpotify(song);
			console.log('the transformed data!', transformedSongData);
			payload = { selectedSong: { ...songData, ...transformedSongData }, isSelectedSongNew: true };
		} else {
			payload = { selectedSong: {
					...song,
					duration: {
						friendly: song.durationFriendly,
						ms: song.durationMs
					}
				},
				isSelectedSongNew: false
			};
		}
		console.log('the payload!', payload);
		dispatch({ type: SELECT_SONG_FINISH, payload });
	} else {
		dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
	}
};

export default selectSong;