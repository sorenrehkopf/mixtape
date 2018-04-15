import {
	INCLUDE_TYPE_CHANGE
} from './types';

const includeTypeChange = (type) => (dispatch, getState) => {
	const { songs: { newIncludeType } } = getState();

	if (type !== newIncludeType) {
		dispatch({ type: INCLUDE_TYPE_CHANGE, payload: { type } });
	}
};

export default includeTypeChange;