import React, { Component, Fragment } from 'react';
import OrderList from './OrderList';

class UserChoice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentSlide: this.props.currentSlide,
			response: '',
			selectedQuestion : null
		};
		this.recordAnswer = this.props.recordAnswer;
	}

	onChoiceSelect = (e) => {

		// Get the selected answer
		const choiceId = parseInt(e.target.previousSibling.value, 10);

		// Make the answer look selected
		const theChoices = e.target.closest('form').childNodes;
		for (let i=0; i<theChoices.length; i++) {
			theChoices[i].firstChild.checked = false;
		}
		e.target.previousSibling.checked = true;

		// Now hide the form
		const theForm = e.target.closest('form');
		theForm.classList.add('hidden');

		this.setState({ selectedQuestion : choiceId });

	}

	render() {
		return (
			<Fragment>
				<div className="mc-answers user-choice">
					<form>
						<p class="text">Please choose a subject area. It doesn't have to be your major.</p>
						{ this.props.content.setContent.map(q =>
							<div className="mc-answer form-check" key={q.contentId}>
								<input type="radio" className="form-check-input" value={q.contentId} name={'s' + this.props.currentSlide} />
								<label className="form-check-label" onClick={this.onChoiceSelect}>{q.contentLabel}</label>
							</div>
						)}
					</form>
					<div className="uc-question-area">
						{ this.props.content.setContent.map(q =>
							<OrderList
								key={q.contentId} 
								content={q}
								slideId={this.props.slideId}
								contentId={q.contentId}
								display={this.state.selectedQuestion === q.contentId} 
								items={q.items}
								text={q.text}
								correctOrder={q.correctOrder}
								perfectResponse={q.perfectResponse}
								goodResponse={q.goodResponse}
								badResponse={q.badResponse}
								recordAnswer={this.props.recordAnswer}
								thawNav={this.props.thawNav}
							/>
						)}
					</div>
				</div>
			</Fragment>
		);
	}

}

export default UserChoice;