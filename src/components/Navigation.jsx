import React from 'react';
import PropTypes from 'prop-types';

const Navigation = (props) => {

	const { numberOfSlides, currentSlide, onNavEvent, navFrozen } = props;

	const rightArrow = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="rightArrow" id="rightArrow">
		<title>Forth</title>
		<path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
		</svg>;

	const leftArrow = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className="leftArrow" id="leftArrow">
		<title>Back</title>
		<path d="M12.586 27.414l-10-10c-0.781-0.781-0.781-2.047 0-2.828l10-10c0.781-0.781 2.047-0.781 2.828 0s0.781 2.047 0 2.828l-6.586 6.586h19.172c1.105 0 2 0.895 2 2s-0.895 2-2 2h-19.172l6.586 6.586c0.39 0.39 0.586 0.902 0.586 1.414s-0.195 1.024-0.586 1.414c-0.781 0.781-2.047 0.781-2.828 0z"></path>
		</svg>

	const leftNavButton = <button onClick={ () => onNavEvent(currentSlide-1, numberOfSlides) } >{leftArrow}</button>

	let rightNavButton = "";
	if (navFrozen) {
		rightNavButton = <button className="frozen">{rightArrow}</button>
	} else {
		rightNavButton = <button className="pulse" onClick={ () => onNavEvent(currentSlide+1, numberOfSlides) } >{rightArrow}</button>
	}

	if (currentSlide+1 === numberOfSlides) {
		return <nav>{leftNavButton}</nav>
	} else if (currentSlide === 0) {
		return <nav>{rightNavButton}</nav>
	} else {
		return <nav>{leftNavButton}{rightNavButton}</nav>
	}

}

Navigation.propTypes = {
	numberOfSlides: PropTypes.number.isRequired,
	currentSlide: PropTypes.number.isRequired,
	onNavEvent: PropTypes.func.isRequired,
	navFrozen: PropTypes.bool.isRequired
};

export default Navigation;