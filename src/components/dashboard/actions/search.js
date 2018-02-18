import {
	SEARCH_START,
	SEARCH_FINISH
} from './types';

import Api from '_/services/api';

const search = (searchTerm) => async(dispatch, getState) => {
	console.log('here!', searchTerm);
	dispatch({ type: SEARCH_START});
	const { data: { songs, error } } = await Api.get(`spotify/songs?searchterm=${searchTerm}`); 
	console.log(songs, error);
	dispatch({ type: SEARCH_FINISH, payload: { songs, error } });
};

export default search;