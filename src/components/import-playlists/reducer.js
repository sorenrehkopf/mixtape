import {
	LOAD_PLAYLISTS_START,
	LOAD_PLAYLISTS_FINISH,
	QUICK_IMPORT_START,
	QUICK_IMPORT_FINISH,
	SELECT_PLAYLIST_START,
	SELECT_PLAYLIST_FINISH,
	SLOW_IMPORT_FINISH 
} from './actions/types';

const initialState = {
	playlists: [],
	selectedPlaylist: JSON.parse('{"collaborative":false,"external_urls":{"spotify":"https://open.spotify.com/user/122841543/playlist/31lzsnzc66t0Npg3jSnumj"},"href":"https://api.spotify.com/v1/users/122841543/playlists/31lzsnzc66t0Npg3jSnumj","id":"31lzsnzc66t0Npg3jSnumj","images":[{"height":640,"url":"https://mosaic.scdn.co/640/049766a28f2806584197060e2c3de8ef1c45c415633cd8e038fe8b0e1b6d7f9dacd1265fd05a2846d1e3bfb43d126765758d1aace0fb45fb767afb61ffbfa901a8c9022e1ea6c6cb7b5c0d7dbe86a22c","width":640},{"height":300,"url":"https://mosaic.scdn.co/300/049766a28f2806584197060e2c3de8ef1c45c415633cd8e038fe8b0e1b6d7f9dacd1265fd05a2846d1e3bfb43d126765758d1aace0fb45fb767afb61ffbfa901a8c9022e1ea6c6cb7b5c0d7dbe86a22c","width":300},{"height":60,"url":"https://mosaic.scdn.co/60/049766a28f2806584197060e2c3de8ef1c45c415633cd8e038fe8b0e1b6d7f9dacd1265fd05a2846d1e3bfb43d126765758d1aace0fb45fb767afb61ffbfa901a8c9022e1ea6c6cb7b5c0d7dbe86a22c","width":60}],"name":"Jazz Faves","owner":{"display_name":"Soren Rehkopf","external_urls":{"spotify":"https://open.spotify.com/user/122841543"},"href":"https://api.spotify.com/v1/users/122841543","id":"122841543","type":"user","uri":"spotify:user:122841543"},"primary_color":null,"public":true,"snapshot_id":"bOp15vZzenkdJQK2we4qvgn7Sda25vwVVNyY7rsouZw3Yxag4RlQ7h0yToGJEcqs","tracks":{"href":"https://api.spotify.com/v1/users/122841543/playlists/31lzsnzc66t0Npg3jSnumj/tracks","total":25},"type":"playlist","uri":"spotify:user:122841543:playlist:31lzsnzc66t0Npg3jSnumj"}'),
	loaded: false
};

const importPlaylistsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_PLAYLISTS_START:
			return {
				...state,
				loading: true
			}
		case LOAD_PLAYLISTS_FINISH:
			return {
				...state,
				loading: false,
				loaded: true,
				playlists: payload.playlists
			}
		case SELECT_PLAYLIST_FINISH:
			return {
				...state,
				quickImportSuccess: false,
				selectedPlaylist: payload.playlist
			}
		case SLOW_IMPORT_FINISH: 
			return {
				...state,
				selectedPlaylist: null
			}
		case QUICK_IMPORT_START:
			return {
				...state,
				importing: true
			}
		case QUICK_IMPORT_FINISH:
			return {
				...state,
				importing: false,
				quickImportSuccess: !payload.error
			}
		default: 
			return state;
	}
};

export default importPlaylistsReducer;