import {
	INCLUDE_TYPE_CHANGE,
	EXCLUDE_TYPE_CHANGE,
	ADD_INCLUDE_TAG,
	ADD_INCLUDE_PARAM,
	ADD_EXCLUDE_TAG,
	ADD_EXCLUDE_PARAM,
	REMOVE_INCLUDE_TAG,
	REMOVE_INCLUDE_PARAM,
	REMOVE_EXCLUDE_TAG,
	REMOVE_EXCLUDE_PARAM
} from './actions/types'

import {
	LOGIN_FINISH
} from '_/components/main/actions/types';

const initialState = {};

const songsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_EXCLUDE_PARAM:
			return {
				...state,
				query: {
					...state.query,
					exclude: {
						...state.query.exclude,
						params: payload.params
					}
				}
			}
		case ADD_EXCLUDE_TAG:
			return {
				...state,
				query: {
					...state.query,
					exclude: {
						...state.query.exclude,
						tags: payload.tags
					}
				}
			}
		case ADD_INCLUDE_TAG:
			return {
				...state,
				query: {
					...state.query,
					include: {
						...state.query.include,
						tags: payload.tags
					}
				}
			}
		case ADD_INCLUDE_PARAM:
			return {
				...state,
				query: {
					...state.query,
					include: {
						...state.query.include,
						params: payload.params
					}
				}
			}
		case EXCLUDE_TYPE_CHANGE: 
			return {
				...state,
				newExcludeType: payload.type
			}
		case INCLUDE_TYPE_CHANGE: 
			return {
				...state,
				newIncludeType: payload.type
			}
		case LOGIN_FINISH:
			return {
				...state,
				songs: payload.currentUser && payload.currentUser.Songs
			}
		case REMOVE_INCLUDE_TAG:
			return {
				...state,
				query: {
					...state.query,
					include: {
						...state.query.include,
						tags: payload.tags
					}
				}
			}
		case REMOVE_EXCLUDE_TAG:
			return {
				...state,
				query: {
					...state.query,
					exclude: {
						...state.query.exclude,
						tags: payload.tags
					}
				}
			}
		default: 
			return state;
	}
};

export default songsReducer;