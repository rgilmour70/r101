import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

const Mnemonic = (props) => {

	const keyword = props.content.keyword;
	const text = props.content.text;
	const terms = props.content.terms.split(', ');

	return (
		<Fragment>
			<div className="mnemonic-header">
				<div className="filler"></div>
				<ul>
				{terms.map((i) => 
					<li key={i} className={i === keyword ? 'active' : null}>{i}</li>
				)}
				</ul>
			</div>
			<h1>{keyword}</h1>
			<div className="text">{ReactHtmlParser(text)}</div>
		</Fragment>
	);
	
}

export default Mnemonic;