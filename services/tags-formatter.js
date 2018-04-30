class TagsFormatter {
	static formatForDB(tags) {
		const { getBoolValue, getNumericValue } = this;
		for (let tag in tags) {
			const isBool = typeof tags[tag] === 'boolean';

			tags[tag] = {
				boolValue: getBoolValue(tags[tag], isBool),
				numericValue: getNumericValue(tags[tag], isBool),
				originalType: typeof tags[tag]
			}
			console.log('a tag!!', tags[tag], isBool);
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
}

module.exports = TagsFormatter;