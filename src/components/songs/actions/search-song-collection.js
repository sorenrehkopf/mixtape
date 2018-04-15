import {
	SEARCH_SONGS_FINISH,
	SEARCH_SONGS_START
} from './types';



const searchSongCollection = () => (dispatch, getState) => {
	const { songs: { query } } = getState();

	dispatch({ type: SEARCH_SONGS_START });

	console.log(query);

	dispatch({ type: SEARCH_SONGS_FINISH });
};

export default searchSongCollection;