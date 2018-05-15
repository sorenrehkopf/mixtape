import {
	LOAD_PLAYLISTS_START,
	LOAD_PLAYLISTS_FINISH,
	QUICK_IMPORT_START,
	QUICK_IMPORT_FINISH,
	SELECT_PLAYLIST_START,
	SELECT_PLAYLIST_FINISH,
	SLOW_IMPORT_FINISH 
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
		case SELECT_PLAYLIST_FINISH:
			return {
				...state,
				selectedPlaylist: payload.playlist
			}
		case SLOW_IMPORT_FINISH: 
			return {
				selectedPlaylist: null
			}
		default: 
			return state;
	}
};

export default importPlaylistsReducer;