import {
	UPDATE_SONG_DATA
} from './types';

const updateSongData = (update) => (dispatch, getState) => {
	dispatch({ type: UPDATE_SONG_DATA, payload: { update }});
};

export default updateSongData;