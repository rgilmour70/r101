import React, { Fragment, useState } from 'react';
import Feedback from './Feedback';

const MultipleChoice = (props) => {

	const [response, setResponse] = useState('');
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		content: this.props.content,
	// 		currentSlide : this.props.currentSlide,
	// 		tried : false,
	// 		contentId : this.props.content.contentId,
	// 		response: '',
	// 	};
	// 	this.recordAnswer = props.recordAnswer;
	// 	this.thawNav = props.thawNav;
	// }

	const currentSlide = props.currentSlide;

	const onMcAnswerSelect = (e) => {

		// this.setState({ tried : true });
		// setTried(true);
		// this.thawNav();

		// Get the selected answer
		const answerId = parseInt(e.target.previousSibling.value, 10);

		// Make the answer look selected
		const theChoices = e.target.closest('form').childNodes;
		for (let i=0; i<theChoices.length; i++) {
			theChoices[i].firstChild.checked = false;
		}
		e.target.previousSibling.checked = true;

		// Determine the correct answer
		const theAnswers = props.content.answers;
		let theRightAnswer = null;
		let response = '';
		for (let j=0; j<theAnswers.length; j++) {
			if (theAnswers[j].isCorrect) {
				theRightAnswer = theAnswers[j].answerId;
			} 
			if (theAnswers[j].answerId === answerId) {
				setResponse(theAnswers[j].response);
			}
		}

		const isCorrect = answerId === theRightAnswer;

		console.log(isCorrect);

		/* Need to thaw the nav. */
		props.thawNav();

		/* Need to record the answer. */
		props.recordAnswer(currentSlide, props.content.contentId, answerId, isCorrect);

		// this.setState({ response: response, mcAnswer: answerId });

		// if (!this.state.tried) {
		// 	this.recordAnswer(this.state.currentSlide, this.state.contentId, answerId, isCorrect);
		// }

	}

	return (
		<Fragment>
			<div className="mc-answers">
				<form>
				{ props.content.answers.map(a =>

					<div className="mc-answer form-check" onClick={onMcAnswerSelect} key={a.answerId}>
						<input type="radio" className="form-check-input" name={'s' + currentSlide} value={a.answerId}/>
						<label className="form-check-label">{a.text}</label>
						<br />
					</div>

				)}
				</form>
			</div>
			<Feedback response={response} />
		</Fragment>
	);


}

export default MultipleChoice;