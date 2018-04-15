import {
	SEARCH_SONGS_FINISH,
	SEARCH_SONGS_START
} from './types';

import Api from '_/services/api';

const searchSongCollection = (data) => async(dispatch, getState) => {
	dispatch({ type: SEARCH_SONGS_START });

	const { data: { songs } } = await Api.get(`songs/${encodeURIComponent(JSON.stringify(data))}`);

	console.log(songs);
	dispatch({ type: SEARCH_SONGS_FINISH });
};

export default searchSongCollection;