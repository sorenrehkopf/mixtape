import {
	QUICK_IMPORT_START,
	QUICK_IMPORT_FINISH
} from './types';

import Api from '_/services/api';

const quickImport = () => async(dispatch, getState) => {
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

	try {
		const success = await Api.get(`spotify/playlistTracks?playlistId=${playlistId}&ownerId=${ownerId}&total=${total}`);
		console.log(success);

		dispatch({ type: QUICK_IMPORT_FINISH });
	} catch (error) {
		dispatch({ type: QUICK_IMPORT_FINISH, payload: { error } });
	}
}

export default quickImport;
