import React, { useState } from 'react';
import Slider from 'react-rangeslider';
import Feedback from './Feedback';

const Range = (props) => {

	const { thawNav, recordAnswer, content } = props;
	const { currentSlide, contentId, scale, minCorrect, maxCorrect, correctResponse, incorrectResponse } = content;

	const [sliderValue, setSliderValue] = useState(0);
	const [tried, setTried] = useState(false);
	const [response, setResponse] = useState('');
	// eslint-disable-next-line
	const [showResponse, setShowResponse] = useState(false);


	const onFinish = () => {

		setTried(true);

		const firstAnswer = sliderValue;

		const isCorrect = ( firstAnswer >= minCorrect && firstAnswer <= maxCorrect );

		let response = isCorrect ? correctResponse : incorrectResponse;
		setResponse(response);
		setShowResponse(true);

		if (isCorrect) {
			thawNav();
		}

		if (!tried) {
			recordAnswer(currentSlide, contentId, firstAnswer, isCorrect);
		}

	};

	const onMove = (value) => {
		setSliderValue(value);
	}

	return (
		<div className='slider'>
			<Slider 
				min={0}
				max={10}
				value={sliderValue}
				onChange={onMove}
				labels={scale}
			/>
			<button className="btn btn-light check-answer" onClick={onFinish} >Check Answer</button>
			<Feedback response={response} />
		</div>
	);
}

export default Range;
