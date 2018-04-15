import {
	EXCLUDE_TYPE_CHANGE
} from './types';

const excludeTypeChange = (type) => (dispatch, getState) => {
	const { songs: { newExcludeType } } = getState();

	if (type !== newExcludeType) {
		dispatch({ type: EXCLUDE_TYPE_CHANGE, payload: { type } });
	}
};

export default excludeTypeChange;