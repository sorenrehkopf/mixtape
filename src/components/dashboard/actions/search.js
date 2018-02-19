import {
	SEARCH_START,
	SEARCH_FINISH
} from './types';

import Api from '_/services/api';

const search = (searchTerm) => async(dispatch, getState) => {
	dispatch({ type: SEARCH_START});
	const { data: { songs, error } } = await Api.get(`spotify/songs?searchterm=${searchTerm}`); 
	dispatch({ type: SEARCH_FINISH, payload: { songs, error } });
};

export default search;