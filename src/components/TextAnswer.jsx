import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Feedback from './Feedback';

const TextAnswer = (props) => {

	const [response, setResponse] = useState('');
	const [tried, setTried] = useState(false);

	const { thawNav, recordAnswer, content } = props;

	const onEnter = (e) => {

		e.preventDefault();
		setTried(true);

		// get the entered answer
		const userInput = e.currentTarget[0].value;
		const correctAnswersArray = content.correctAnswers.split(',');
		let isCorrect = false;
		for (let i=0; i<correctAnswersArray.length; i++) {
			const regex = new RegExp(correctAnswersArray[i].trim(), 'i');
			if (regex.test(userInput)) {
				isCorrect = true;
				break;
			} 
		}

		if (isCorrect) {
			setResponse(content.correctResponse);
			thawNav();
		} else {
			setResponse(content.incorrectResponse);
		}

		if (!tried) {
			recordAnswer(props.currentSlide, props.content.contentId, userInput, isCorrect);
		}

	}

	return (
		<Fragment>
			<form className="input-group" onSubmit={onEnter}>
				<input type="text" />
				<div>
					<button type="submit" className="check-answer">Check Answer</button>
				</div>
			</form>
			<Feedback response={response} />
		</Fragment>
	);

}

TextAnswer.propTypes = {
	content: PropTypes.object.isRequired,
	thawNav: PropTypes.func.isRequired,
	recordAnswer: PropTypes.func.isRequired
};

export default TextAnswer;