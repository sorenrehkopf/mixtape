import {
	SEARCH_SONGS_FINISH,
	SEARCH_SONGS_START
} from './types';



const searchSongCollection = (data) => (dispatch, getState) => {
	dispatch({ type: SEARCH_SONGS_START });

	console.log(data);

	dispatch({ type: SEARCH_SONGS_FINISH });
};

export default searchSongCollection;