import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Feedback from './Feedback';
import ModalLink from './ModalLink';

const MultipleChoice = (props) => {

	const [response, setResponse] = useState('');
	const [tried, setTried] = useState(false);

	const { currentSlide, content, thawNav, recordAnswer } = props;

	const onMcAnswerSelect = (e) => {

		setTried(true);

		// Get the selected answer
		const answerId = parseInt(e.target.previousSibling.value, 10);

		// Make the answer look selected
		const theChoices = e.target.closest('form').childNodes;
		for (let i=0; i<theChoices.length; i++) {
			theChoices[i].firstChild.checked = false;
		}
		e.target.previousSibling.checked = true;

		// Determine the correct answer
		const theAnswers = content.answers;
		let theRightAnswer = null;
		for (let j=0; j<theAnswers.length; j++) {
			if (theAnswers[j].isCorrect) {
				theRightAnswer = theAnswers[j].answerId;
			} 
			if (theAnswers[j].answerId === answerId) {
				setResponse(theAnswers[j].response);
			}
		}

		const isCorrect = answerId === theRightAnswer;

		if (isCorrect) {
			thawNav();
		}

		/* Need to only record the answer if it's the first one! */
		if (!tried) {
			recordAnswer(currentSlide, props.content.contentId, answerId, isCorrect);
		}

	}

	return (
		<Fragment>
			<div className="mc-answers">
				<form>
				{ props.content.answers.map(a =>
					<div key={a.answerId} className="mc-answer-wrapper">
						<span className="mc-answer form-check" onClick={onMcAnswerSelect} key={a.answerId}>
							<input type="radio" className="form-check-input" name={'s' + currentSlide} value={a.answerId}/>
							<label className="form-check-label">{a.text}</label>
						</span>
						<ModalLink info={a.info} infoLabel={a.infoLabel} />
						<br />
					</div>
				)}
				</form>
			</div>
			<Feedback response={response} />
		</Fragment>
	);

}

MultipleChoice.propTypes = {
	currentSlide: PropTypes.number.isRequired,
	content: PropTypes.object.isRequired,
	thawNav: PropTypes.func.isRequired,
	recordAnswer: PropTypes.func.isRequired
};

export default MultipleChoice;