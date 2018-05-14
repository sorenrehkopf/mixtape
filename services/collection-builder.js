const shuffle = require('lodash/shuffle');

class CollectionBuilder {
	static filterResults({ songs, params: { exclude } }) {
		const excludeTags = Object.keys(exclude.tags);
		return songs.filter(({ tags }) => {
			const songTags = Object.keys(tags);

			if (exclude.tagsExclusive) {
				return !excludeTags.every(tag => songTags.includes(tag));
			}

			return !excludeTags.some(tag => songTags.includes(tag));
		});	
	}

	static getPlaylistUris({ songs, params }) {
		const songUris = this.filterResults({
			songs,
			params
		}).map(({ spotifyId }) => `spotify:track:${spotifyId}`);

		return shuffle(songUris).slice(0, 24);
	}
};

module.exports = CollectionBuilder;