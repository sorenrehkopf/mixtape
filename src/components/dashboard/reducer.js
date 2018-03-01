import {
	SEARCH_START,
	SEARCH_FINISH,
	SELECT_SONG_START,
	SELECT_SONG_FINISH,
	UPDATE_SONG_DATA
} from './actions/types';

const initialState = {
	songs: []
};

const dashboardReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SEARCH_START:
			return {
				...state,
				searching: true
			}
		case SEARCH_FINISH:
			return {
				...state,
				searching: false,
				songs: payload.songs
			}
		case SELECT_SONG_FINISH:
			return {
				...state,
				selectedSong: payload.selectedSong
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
	}
};

export default dashboardReducer;