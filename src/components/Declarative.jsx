// eslint-disable-next-line
import React, { Fragment } from 'react';
import renderHTML from 'react-render-html';

const Declarative = (props) => {
	return <div className="text">{renderHTML(props.content.set.setContent[0].text)}</div>;
}

export default Declarative;