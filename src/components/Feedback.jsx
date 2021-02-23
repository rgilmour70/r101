import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

const Feedback = (props) => {

	if (props.response !== '') {
		return (
			<div className="feedback">{ReactHtmlParser(props.response)}</div>
		);
	} else {
		return null;
	}

};

Feedback.propTypes = {
	response: PropTypes.string.isRequired
};

export default Feedback;