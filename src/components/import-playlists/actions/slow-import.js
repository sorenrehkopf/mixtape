import {
	SLOW_IMPORT_START,
	SLOW_IMPORT_FINISH
} from './types';

import {
	SONG_SELECT_FINISH
} from '_/components/main/actions/types';

import Api from '_/services/api';
import { convertBasicSongInfoFromSpotify } from '_/services/transform-song-data';

import selectSong from '_/components/dashboard/actions/select-song';

const slowImport = ({ id: playlistId, owner: { id: ownerId }, tracks: { total } }) => async(dispatch, getState) => {
	dispatch({ type: SLOW_IMPORT_START });

	const { data: { tracks } } = await Api.get(`spotify/playlistTracks?playlistId=${playlistId}&ownerId=${ownerId}&total=${total}`);
	const firstTrack = tracks.shift();
	const payload = { tracks: tracks.map(({ track }) => track) };

	dispatch(selectSong(convertBasicSongInfoFromSpotify(firstTrack.track), true));
	dispatch({ type: SLOW_IMPORT_FINISH, payload });
}

export default slowImport;
