import {
	AUTHENTICATE_START,
	AUTHENTICATE_FINISH
} from './actions/types.js';

const initialState = {
	authenticated: false
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE_START:
			return { 
				...state,
				authenticating: true
			};
		case AUTHENTICATE_FINISH:
			return {
				...state,
				authenticating: false,
				authenticated: !payload.error && payload.user,
				currentUser: payload.user
			}
		default:
			return state;
	};
};

export default mainReducer;