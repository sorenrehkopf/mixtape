import {
	SEARCH_START,
	SEARCH_FINISH,
	SELECT_SONG_START,
	SELECT_SONG_FINISH,
	UPDATE_SONG_DATA
} from './actions/types';

const initialState = {
	songs: [],
	selectedSong: JSON.parse('{"albumName":"These Streets","artistName":"Paolo Nutini","duration":203653,"id":"265Anh9hGoozFigjUVLUeD","imageUrl":"https://i.scdn.co/image/2a98353a61ec4a403524868ee81d70e00beb6c8c","name":"New Shoes","previewUrl":"https://p.scdn.co/mp3-preview/d49eccb4b21bcf4906633f52d2f1f30304183565?cid=b9a8decac5d24bdcba62b640d28c7213","danceability":0.748,"energy":0.735,"key":8,"loudness":-8.692,"mode":1,"speechiness":0.0903,"acousticness":0.47,"instrumentalness":0.0000109,"liveness":0.0851,"valence":0.854,"tempo":150.04,"type":"audio_features","uri":"spotify:track:265Anh9hGoozFigjUVLUeD","track_href":"https://api.spotify.com/v1/tracks/265Anh9hGoozFigjUVLUeD","analysis_url":"https://api.spotify.com/v1/audio-analysis/265Anh9hGoozFigjUVLUeD","duration_ms":203653,"time_signature":4}')
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