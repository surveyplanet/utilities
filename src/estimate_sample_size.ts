function getZscore(confidence: number) {
	// z = (score - mean) / standard deviation

	return (function () {
		switch (confidence) {
			case 0.8:
				return 1.28;
			case 0.85:
				return 1.44;
			case 0.9:
				return 1.65;
			case 0.95:
				return 1.96;
			case 0.99:
				return 2.58;
			default:
				return 0;
		}
	})();
}

/**
 * Figure out how many people you need to take your survey. Using the Cochran method:
 * https://www.statisticshowto.com/probability-and-statistics/find-sample-size/#Cochran
 *
 * @name estimateSampleSize
 * @param {number} population  The pool of individuals from which a statistical sample is drawn for a study. Thus, any selection of individuals grouped by a common feature can be said to be a population.
 * @param {number} marginOfError How many percentage points your results will differ from the real population value
 * @param {number} confidenceLevel Indicates the probability, with which the estimation of the location of a statistical parameter (e.g. an arithmetic mean) in a sample survey is also true for the population. The industry standard is 95%.
 * @returns {number}
 * @example estimateSampleSize(100000, 0.05, 0.95) // returns 383
 */
function estimateSampleSize(
	population: number,
	marginOfError: number,
	confidenceLevel = 0.95
): number {
	const z = getZscore(confidenceLevel);
	const p = 0.5; // proportion of success
	const q = 1 - p; // proportion of failure

	const sample = (Math.pow(z, 2) * p * q) / Math.pow(marginOfError, 2);

	// Modification for the Cochran Formula in smaller populations
	if (!isNaN(population)) {
		const populationMod = 1 + (sample - 1) / population;
		return Math.ceil(sample / populationMod);
	}

	return Math.ceil(sample);
}

export default estimateSampleSize;
