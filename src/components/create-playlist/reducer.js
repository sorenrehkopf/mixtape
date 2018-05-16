import { DateTime } from 'luxon';

import {
	UPDATE_PLAYLIST_DATA,
	CREATE_PLAYLIST_START,
	CREATE_PLAYLIST_FINISH,
	CLEAR_CREATED_PLAYLIST
} from './actions/types';

const initialState = {
	playlistData: {
		name: DateTime.local().toLocaleString(),
		recycle: true
	},
	createdPlaylist: null,
	loading: false
};

const createPlaylistReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case UPDATE_PLAYLIST_DATA:
			return {
				...state,
				playlistData: {
					...state.playlistData,
					...payload
				}
			};
		case CREATE_PLAYLIST_START:
			return {
				...state,
				loading: true
			}
		case CREATE_PLAYLIST_FINISH:
			return {
				...state,
				createdPlaylist: payload.playlist,
				loading: false
			}
		case CLEAR_CREATED_PLAYLIST:
			return {
				...state,
				createdPlaylist: null
			}
		default: 
			return state;
	}
};

export default createPlaylistReducer;