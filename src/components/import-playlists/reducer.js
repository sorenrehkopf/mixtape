import {
	LOAD_PLAYLISTS_START,
	LOAD_PLAYLISTS_FINISH
} from './actions/types';

const initialState = {
	playlists: [],
	loaded: false
};

const importPlaylistsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_PLAYLISTS_START:
			return {
				...state,
				loading: true
			}
		case LOAD_PLAYLISTS_FINISH:
			return {
				...state,
				loading: false,
				loaded: true,
				playlists: payload.playlists
			}
		default: 
			return state;
	}
};

export default importPlaylistsReducer;