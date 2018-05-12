import {
	UPDATE_PLAYLIST_DATA,
	CREATE_PLAYLIST_START,
	CREATE_PLAYLIST_FINISH
} from './actions/types';

const initialState = {
	playlistData: {
		name: ''
	},
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
		default: 
			return state;
	}
};

export default createPlaylistReducer;