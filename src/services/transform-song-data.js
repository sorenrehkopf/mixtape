import round from 'lodash/round';

const keyMappings = [
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

const transformSongData = ({ danceability, energy, loudness, key, tempo, valence, ...everythingElse}) => ({
	...everythingElse,
	key: keyMappings[key],
	danceability: round(danceability * 10, 2),
	energy: round(energy * 10, 2),
	tempo: round(tempo, 2),
	valence: round(valence * 10, 2),
	loudness: round(loudness, 2),
	tags: []
});

export default transformSongData;