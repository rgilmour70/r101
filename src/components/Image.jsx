import React from 'react';

const Image = (props) => {

	const { imgSrc } = props;

	if (imgSrc !== '') {
		return <img src={imgSrc} alt="" />
	} else {
		return null;
	}
}

export default Image;