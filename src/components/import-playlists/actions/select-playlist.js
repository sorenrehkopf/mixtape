import {
	SELECT_PLAYLIST_FINISH 
} from './types';

const selectPlaylist = (playlist) => async(dispatch, getState) => {
	dispatch({ type: SELECT_PLAYLIST_FINISH, payload: { playlist } });
}

export default selectPlaylist;
