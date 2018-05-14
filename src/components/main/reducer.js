import {
	ADD_SONG_START,
	ADD_SONG_FINISH,
	SPOTIFY_ERROR,
	LOGIN_START,
	LOGIN_FINISH,
	LOGOUT,
	SELECT_SONG_FINISH,
	UPDATE_SONG_DATA
} from './actions/types';

import {
	SLOW_IMPORT_FINISH
} from '_/components/import-playlists/actions/types';

const initialState = {
	authenticated: false,
	authenticating: false,
	importQueue: []
};

const mainReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_SONG_START:
			return {
				...state,
				addingSong: true
			}
		case ADD_SONG_FINISH:
			return {
				...state,
				error: payload.error,
				currentUser: {
					...state.currentUser,
					Tags: [
						...Object.keys(payload.addedSongData.tags).map(tag => ({
							name: tag
						})).filter(({ name }) => !state.currentUser.Tags.some(tag => tag.name == name)),	
						...state.currentUser.Tags
					]
				}
			}
		case LOGIN_START:
			return { 
				...state,
				authenticating: true
			};
		case LOGIN_FINISH:
			return {
				...state,
				authenticating: false,
				authenticated: !payload.error && payload.user,
				currentUser: payload.user
			}
		case LOGOUT:
			return {
				...state,
				authenticated: false,
				currentUser: null
			}
		case SPOTIFY_ERROR:
			return {
				...state,
				error: payload.error
			}
		case SELECT_SONG_FINISH:
			return {
				...state,
				selectedSong: payload.selectedSong,
				isSelectedSongNew: payload.isSelectedSongNew
			}
		case SLOW_IMPORT_FINISH:
			return {
				...state,
				importQueue: payload.tracks
			}
		case UPDATE_SONG_DATA:
			return {
				...state,
				selectedSong: {
					...state.selectedSong,
					...payload.update
				}
			}
		default:
			return state;
	};
};

export default mainReducer;