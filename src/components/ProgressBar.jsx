import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {

	const { currentSlide, numberOfSlides } = props;

	const howFar = currentSlide / numberOfSlides * 100;

	const styles = {width: `${howFar}%`};

	return (
		<div className="progress">
			<div className="progress-bar" style={styles} role="progressbar"></div>
		</div>
	);

}

ProgressBar.propTypes = {
	currentSlide: PropTypes.number.isRequired,
	numberOfSlides: PropTypes.number.isRequired
};

export default ProgressBar;