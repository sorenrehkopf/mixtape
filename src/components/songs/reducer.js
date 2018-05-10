import {
	CLEAR_SEARCH_RESULTS,
	SEARCH_SONGS_FINISH,
	SEARCH_SONGS_START
} from './actions/types'

import {
	LOGIN_FINISH
} from '_/components/main/actions/types';

import {
	ADD_SONG_FINISH
} from '_/components/dashboard/actions/types';

const initialState = {};

const songsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_SONG_FINISH:
			return {
				...state,
				songs: [
					...[payload.addedSongData].filter(({ spotifyId}) => {
						return !state.songs.some(song => song.spotifyId == spotifyId);
					}),
					...state.songs
				]
			}
		case CLEAR_SEARCH_RESULTS:
			return {
				...state,
				search: false,
				queryResults: []
			}
		case LOGIN_FINISH:
			return {
				...state,
				songs: payload.currentUser && payload.currentUser.Songs
			}
		case SEARCH_SONGS_START:
			return {
				...state,
				queryResults: [],
				search: true,
				loading: true	
			}
		case SEARCH_SONGS_FINISH:
			return {
				...state,
				loading: false,
				queryResults: payload.queryResults
			}
		default: 
			return state;
	}
};

export default songsReducer;