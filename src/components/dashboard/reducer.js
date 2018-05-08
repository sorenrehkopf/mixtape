import {
	SEARCH_FINISH,
	SEARCH_START,
	UPDATE_SONG_DATA
} from './actions/types';

const initialState = {
	songs: [],
	// selectedSong: JSON.parse('{"albumName":"Pray For Me (with Kendrick Lamar)","artistName":"The Weeknd","duration":{"friendly":"3:31","ms":211440},"id":"6ZNo7Vi0TE9ul1fhKd4S1M","imageUrl":"https://i.scdn.co/image/58f537e877808ee72fd13b854aa46d5a6d643cf6","name":"Pray For Me (with Kendrick Lamar)","previewUrl":null,"mode":1,"speechiness":0.0871,"acousticness":0.092,"instrumentalness":0.0000212,"liveness":0.104,"type":"audio_features","uri":"spotify:track:6ZNo7Vi0TE9ul1fhKd4S1M","track_href":"https://api.spotify.com/v1/tracks/6ZNo7Vi0TE9ul1fhKd4S1M","analysis_url":"https://api.spotify.com/v1/audio-analysis/6ZNo7Vi0TE9ul1fhKd4S1M","duration_ms":211440,"danceability":7.3,"energy":6.7,"key":"D","loudness":-5,"tags": { "aBoolTag": true, "aNumberTag": 5 },"tempo":100.6,"timeSignature":"4/4","valence":1.7}')
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