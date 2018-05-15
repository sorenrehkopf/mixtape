import {
	QUICK_IMPORT_START,
	QUICK_IMPORT_FINISH
} from './types';

import Api from '_/services/api';

const quickImport = (tags) => async(dispatch, getState) => {
	dispatch({ type: QUICK_IMPORT_START });

	const {
		importPlaylists: {
			selectedPlaylist: {
				id: playlistId, 
				owner: { 
					id: ownerId 
				},
				tracks: { 
					total 
				} 
			}
		}
	} = getState();

	const data = {
		playlistId,
		ownerId,
		total,
		tags
	}

	try {
		const { data: { songs } } = await Api.post('songs/bulkAddPlaylist', data);

		dispatch({ type: QUICK_IMPORT_FINISH, payload: { songs } });
	} catch (error) {
		dispatch({ type: QUICK_IMPORT_FINISH, payload: { error } });
	}
}

export default quickImport;
