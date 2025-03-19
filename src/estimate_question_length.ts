import type {
	Question,
	QuestionType,
	QuestionProperties,
} from '@surveyplanet/types';

/**
 * Estimates the time in seconds it would take to answer a question
 * @param question The question to estimate the time for
 * @returns Time in seconds
 */
export function estimateQuestionLength(
	question?: Partial<Question<QuestionType>>
): number {
	if (!question) {
		return 0;
	}

	if (!question.type || !question.properties) {
		return 0;
	}

	let score = 0;

	// Handle each question type
	if (question.type === 'multiple_choice') {
		const props =
			question.properties as QuestionProperties<'multiple_choice'>;
		if (props.multi) {
			// 1 point for every 2 options
			score = Math.round(props.labels.length / 2);
		} else {
			// 1 point for every 10 options
			score = Math.ceil(props.labels.length / 10);
		}

		if (props.other !== undefined) {
			score += 3;
		}
	} else if (question.type === 'image') {
		const props = question.properties as QuestionProperties<'image'>;
		if (props.multi) {
			// 1 point for every 2 options
			score = Math.round(props.labels.length / 2);
		} else {
			// 1 point for every 10 options
			score = Math.ceil(props.labels.length / 10);
		}
	} else if (question.type === 'rating') {
		const props = question.properties as QuestionProperties<'rating'>;
		// 1 point for every 10 options
		score = Math.ceil(props.labels.length / 10);
	} else if (question.type === 'essay') {
		const props = question.properties as QuestionProperties<'essay'>;
		// average word length is: 5
		// average word per phase is: 7
		// average characters per phrase: 35
		const charPerPhase = 35;

		// 3 points for every expected phrase
		const pointInc = 3;

		if (!props.min) {
			score = pointInc;
		} else {
			score = Math.round(props.min / charPerPhase) * pointInc;
			score = Math.max(score, pointInc);
		}
	} else if (question.type === 'form') {
		const props = question.properties as QuestionProperties<'form'>;
		// 3 points for each input
		score = props.labels.length * 3;
	} else if (question.type === 'scoring') {
		const props = question.properties as QuestionProperties<'scoring'>;
		score = props.labels.length;
	} else if (['scale', 'range', 'date_time'].includes(question.type)) {
		score = 1;
	}

	// add three if there are comments
	if (question.comments) {
		score += 3;
	}

	// Score must be at least 1. Score multiplied by 8 will give the
	// total number of minutes. 8 is the number of simple questions that
	// can be answered in one minute.
	score = Math.max(score, 1) / 8;

	return score * 60;
}
