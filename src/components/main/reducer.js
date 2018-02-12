import {
	AUTHENTICATE_START,
	AUTHENTICATE_FINISH,
	LOGIN_START,
	LOGIN_FINISH
} from './actions/types.js';

const initialState = {
	authenticated: false
};

const mainReducer = (state = initialState, { type, payload }) => {
	switch (type) {
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
		default:
			return state;
	};
};

export default mainReducer;