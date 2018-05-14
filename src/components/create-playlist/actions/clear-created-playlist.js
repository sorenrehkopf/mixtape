import {
	CLEAR_CREATED_PLAYLIST
} from './types';

const clearCreatedPlaylist = () => (dispatch, getState) => {
	dispatch({ type: CLEAR_CREATED_PLAYLIST });
}

export default clearCreatedPlaylist;
