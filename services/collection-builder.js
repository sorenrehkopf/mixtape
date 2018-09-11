const shuffle = require('lodash/shuffle');

class CollectionBuilder {
	static get distributionFunctions() {
		return {
			alternate: ({ songs, params }) => {
				return songs;
			},
			spread: ({ songs, params }) => {
				return songs;
			}
		};
	}

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

	static getPlaylistUris({ songs, params, order, distribution, limit = 40 }) {
		songs = this.filterResults({
			songs,
			params
		});

		if (order == 'shuffle') {
			songs = shuffle(songs);
	
			if (distribution && this.distributionFunctions[distribution]) {
				songs = this.distributionFunctions[distribution]({ songs, params });
			}
		}

		const uris = songs.map(({ spotifyId }) => `spotify:track:${spotifyId}`);

		return uris.slice(0, limit);
	}
};

module.exports = CollectionBuilder;