import {
	ADD_INCLUDE_TAG
} from './types';

const addIncludeTag = (tag) => (dispatch, getState) => {
	const { songs: { query: { include: { tags } } } } = getState();
	const newTags = {
		...tags
	};
	console.log(tag);

	newTags[tag] = true;

	dispatch({ type: ADD_INCLUDE_TAG, payload: { tags: newTags } });
};

export default addIncludeTag;