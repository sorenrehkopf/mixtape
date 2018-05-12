import {
	UPDATE_PLAYLIST_DATA
} from './types';

import Api from '_/services/api';

const updatePlaylistData = (data) => async(dispatch, getState) => {
	dispatch({ type: UPDATE_PLAYLIST_DATA, payload: data });
};

export default updatePlaylistData;