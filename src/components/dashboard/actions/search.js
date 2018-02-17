import {
	SEARCH_START,
	SEARCH_FINISH
} from './types';

import Api from '_/services/api';

const search = (searchTerm) => async(dispatch, getState) => {
	console.log('here!', searchTerm);
	dispatch({ type: SEARCH_START});
	const { data: { songs } } = await Api.get(`spotify/songs?searchterm=${searchTerm}`); 
	dispatch({ type: SEARCH_FINISH, payload: { songs } });
};

export default search;