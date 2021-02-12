import React from 'react';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';

const Declarative = (props) => {
	return <div className="text">{renderHTML(props.content.text)}</div>;
}

Declarative.propTypes = {
	content: PropTypes.object.isRequired
};

export default Declarative;