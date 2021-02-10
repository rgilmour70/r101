// eslint-disable-next-line
import React, { Fragment } from 'react';
import renderHTML from 'react-render-html';

const Declarative = (props) => {
	console.log(props);
	return <div className="text">{renderHTML(props.content.text)}</div>;
}

export default Declarative;