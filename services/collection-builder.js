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

	static getPlaylistUris({ songs, params, order }) {
		const songUris = this.filterResults({
			songs,
			params
		}).map(({ spotifyId }) => `spotify:track:${spotifyId}`);

		if (order == 'shuffle') {
			return shuffle(songUris).slice(0, 40);
		}

		return songUris.slice(0,40);
	}
};

module.exports = CollectionBuilder;