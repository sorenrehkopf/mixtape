import {
	REMOVE_INCLUDE_TAG
} from './types';

const addExcludeTag = (tag) => (dispatch, getState) => {
	const { songs: { query: { include: { tags } } } } = getState();
	const newTags = {
		...tags
	};

	delete newTags[tag];

	dispatch({ type: REMOVE_INCLUDE_TAG, payload: { tags: newTags } });
};

export default addExcludeTag;