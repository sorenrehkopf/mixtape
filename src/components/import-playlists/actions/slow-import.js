import {
	SLOW_IMPORT_START,
	SLOW_IMPORT_FINISH
} from './types';

import Api from '_/services/api';
import { convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

import selectSong from '_/components/dashboard/actions/select-song';

const slowImport = () => async(dispatch, getState) => {
	dispatch({ type: SLOW_IMPORT_START });
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

	let { data: { tracks } } = await Api.get(`spotify/playlistTracks?playlistId=${playlistId}&ownerId=${ownerId}&total=${total}`);
	tracks = tracks.map(({ track }) => convertBasicSongInfoFromSpotify(track));
	const payload = { tracks };

	dispatch(selectSong(tracks[0], true));
	dispatch({ type: SLOW_IMPORT_FINISH, payload });
}

export default slowImport;
