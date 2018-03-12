import {
	ADD_SONG_FINISH,
	ADD_SONG_START
} from './types';

import {
	SELECT_SONG_FINISH
} from '_/components/dashboard/actions/types';

import Api from '_/services/api';

const addSong = () => async(dispatch, getState) => {
	const { dashboard: { selectedSong } } = getState();
	
	dispatch({ type: ADD_SONG_START });

	const { data: addedSongData } = await Api.post('songs', selectedSong);

	dispatch({ type: ADD_SONG_FINISH, payload: { addedSongData } });
	dispatch({ type: SELECT_SONG_FINISH, payload: { selectedSong: null } });
};

export default addSong;