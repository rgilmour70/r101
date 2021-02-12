import React from 'react';
import PropTypes from 'prop-types';
// import renderHTML from 'react-render-html';

const Feedback = (props) => {

	if (props.response !== '') {
		return (
			<div className="feedback">{props.response}</div>
		);
	} else {
		return null;
	}

};

Feedback.PropTypes = {
	response: PropTypes.string.isRequired
}
export default Feedback;