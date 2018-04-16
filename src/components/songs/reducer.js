import {
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
		case LOGIN_FINISH:
			return {
				...state,
				songs: payload.currentUser && payload.currentUser.Songs
			}
		case ADD_SONG_FINISH:
			return {
				...state,
				songs: [
					...state.songs,
					payload.addedSongData
				]
			}
		default: 
			return state;
	}
};

export default songsReducer;