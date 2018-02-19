import {
	SELECT_SONG_START,
	SELECT_SONG_FINISH
} from './types';

const selectSong = (id) => (dispatch, getState) => {
	console.log('the id!', id);
	dispatch({ type: SELECT_SONG_START });

	dispatch({ type: SELECT_SONG_FINISH })
};

export default selectSong;