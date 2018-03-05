import {
	ADD_SONG_FINISH,
	ADD_SONG_START
} from './types';

import Api from '_/services/api';

const addSong = () => async(dispatch, getState) => {
	const { dashboard: { selectedSong } } = getState();
	dispatch({ type: ADD_SONG_START });
	console.log(selectedSong);
	const successData = await Api.post('songs', selectedSong);
	console.log(successData);
	dispatch({ type: ADD_SONG_FINISH, payload: { selectedSong: null } });
};

export default addSong;