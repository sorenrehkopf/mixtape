const round = require('lodash/round');

class SongFormatter {
	static get keyMappings() {
		return [
			'C',
			'C#',
			'D',
			'D#',
			'E',
			'F',
			'F#',
			'G',
			'G#',
			'A',
			'A#',
			'B',
		];
	}

	static formatForDB(tags) {
		const { getBoolValue, getNumericValue } = this;
		for (let tag in tags) {
			const isBool = typeof tags[tag] === 'boolean';

			tags[tag] = {
				boolValue: getBoolValue(tags[tag], isBool),
				numericValue: getNumericValue(tags[tag], isBool),
				originalType: typeof tags[tag]
			}
		}

		return tags
	}

	static formatForClient(tags) {
		for (let tag in tags) {
			const { boolValue, numericValue, originalType } = tags[tag];
			const isBool = originalType === 'boolean';

			tags[tag] = isBool ? boolValue : numericValue;
		}

		return tags;
	}

	static getBoolValue(value, isBool) {
		if (isBool) {
			return value;
		}

		if (value > 5) {
			return true;
		}

		return false;
	}

	static getNumericValue(value, isBool) {
		if (!isBool) {
			return value;
		}

		if (value) {
			return 6;
		}

		return 0;
	}

	static formatTime(milliseconds) {
		const roundedMilliseconds = 1000 * Math.round(milliseconds / 1000);
		const date = new Date(roundedMilliseconds);

		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();
		
		return `${minutes}:${seconds}`;
	};

	static convertFromSpotifyData(song) {
		const { 
			album: {
				images: [{}, {
					url: imageUrl
				}],
				name: albumName
			},
			artists: [{
				name: artistName
			}],
			acousticness,
			danceability,
			duration_ms,
			duration_ms: duration,
			energy,
			id,
			instrumentalness,
			key,
			loudness,
			name,
			preview_url: previewUrl,
			tempo,
			time_signature,
			valence
		} = song;

		return {
			acousticness: round(acousticness * 10, 1),
			albumName,
			artistName,
			danceability: round(danceability * 10, 1),
			durationFriendly: this.formatTime(duration), 
			durationMs: duration,
			energy: round(energy * 10, 1),
			imageUrl,
			instrumentalness: round(instrumentalness * 10, 1),
			key: this.keyMappings[key],
			loudness: round(loudness, 1),
			name,
			previewUrl,
			spotifyId: id,
			tempo: round(tempo, 1),
			timeSignature: `${time_signature}/4`,
			valence: round(valence * 10, 1)
		}
	}
}

module.exports = SongFormatter;