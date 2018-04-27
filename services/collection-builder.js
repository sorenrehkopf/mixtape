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
};

module.exports = CollectionBuilder;