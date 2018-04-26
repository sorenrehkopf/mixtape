import {
	CLEAR_SEARCH_RESULTS
} from './types';

import Api from '_/services/api';

const clearSearchResults = () => async(dispatch, getState) => {
	dispatch({ type: CLEAR_SEARCH_RESULTS });
};

export default clearSearchResults;