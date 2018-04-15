import {
	ADD_EXCLUDE_TAG
} from './types';

const addExcludeTag = (tag) => (dispatch, getState) => {
	const { songs: { query: { exclude: { tags } } } } = getState();
	const newTags = {
		...tags
	};

	newTags[tag] = true;

	dispatch({ type: ADD_EXCLUDE_TAG, payload: { tags: newTags } });
};

export default addExcludeTag;