import {
	SEARCH_START,
	SEARCH_FINISH
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
		default: 
			return state;
	}
};

export default dashboardReducer;