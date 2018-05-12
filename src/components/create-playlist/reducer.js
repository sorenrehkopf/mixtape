import {
	UPDATE_PLAYLIST_DATA,
	CREATE_PLAYLIST_START,
	CREATE_PLAYLIST_FINISH
} from './actions/types';

const initialState = {
	playlistData: {
		name: ''
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
		default: 
			return state;
	}
};

export default createPlaylistReducer;