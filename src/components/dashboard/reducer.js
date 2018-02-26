import {
	SEARCH_START,
	SEARCH_FINISH,
	SELECT_SONG_START,
	SELECT_SONG_FINISH,
	UPDATE_SONG_DATA
} from './actions/types';

const initialState = {
	songs: [],
	selectedSong: JSON.parse('{"danceability":0.356,"energy":0.0937,"key":8,"loudness":-16.64,"mode":0,"speechiness":0.0353,"acousticness":0.957,"instrumentalness":0.096,"liveness":0.209,"valence":0.278,"tempo":86.669,"type":"audio_features","id":"3PJMsxg6rz9FOo6xNiASXz","uri":"spotify:track:3PJMsxg6rz9FOo6xNiASXz","track_href":"https://api.spotify.com/v1/tracks/3PJMsxg6rz9FOo6xNiASXz","analysis_url":"https://api.spotify.com/v1/audio-analysis/3PJMsxg6rz9FOo6xNiASXz","duration_ms":342373,"time_signature":3}')
};

const dashboardReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SEARCH_START:
			return {
				...state,
				searching: true
			}
		case SEARCH_FINISH:
			return {
				...state,
				searching: false,
				songs: payload.songs
			}
		case SELECT_SONG_FINISH:
			return {
				...state,
				selectedSong: payload.selectedSong
			}
		case UPDATE_SONG_DATA:
			return {
				...state,
				selectedSong: {
					...state.selectedSong,
					...payload.update
				}
			}
		default: 
			return state;
	}
};

export default dashboardReducer;