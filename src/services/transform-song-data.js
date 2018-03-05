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

const transformSongData = ({ danceability, energy, loudness, key, tempo, time_signature, valence, ...everythingElse}) => ({
	...everythingElse,
	danceability: round(danceability * 10, 1),
	energy: round(energy * 10, 1),
	key: keyMappings[key],
	loudness: round(loudness, 1),
	tags: {},
	tempo: round(tempo, 1),
	timeSignature: `${time_signature}/4`,
	valence: round(valence * 10, 1)
});

export default transformSongData;