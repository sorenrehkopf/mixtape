import {
	LOGIN_START,
	LOGIN_FINISH,
	LOGOUT
} from './actions/types';

const initialState = {
	authenticated: false
};

const mainReducer = (state = initialState, { type, payload }) => {
	switch (type) {
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
		default:
			return state;
	};
};

export default mainReducer;