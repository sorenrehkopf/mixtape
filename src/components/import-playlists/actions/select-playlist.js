import {
	SELECT_PLAYLIST_FINISH 
} from './types';

const selectPlaylist = (playlist) => async(dispatch, getState) => {
	console.log(JSON.stringify(playlist));
	dispatch({ type: SELECT_PLAYLIST_FINISH, payload: { playlist } });
}

export default selectPlaylist;
