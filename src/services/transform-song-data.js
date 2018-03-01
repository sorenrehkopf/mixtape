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
	danceability: round(danceability * 10, 1),
	energy: round(energy * 10, 1),
	tempo: round(tempo, 1),
	valence: round(valence * 10, 1),
	loudness: round(loudness, 1),
	tags: { aKey: true, aNumberKey: 5 }
});

export default transformSongData;