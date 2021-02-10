// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import LightenDarkenColor from './utils/colors.js';
// import ProgressBar from './components/progressBar';
import Slide from './components/Slide';
import Navigation from './components/Navigation';
import Splash from './components/Splash';

const queryString = require('query-string');

const App = () => {

	const tutorialSlug = queryString.parse(window.location.search).t;

	const [slug, setSlug] = useState(tutorialSlug);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [content, setContent] = useState([]);

	const [tried, setTried] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [navFrozen, setNavFrozen] = useState(false);
	// const [feedback, setFeedback] = useState('');

	// The record is an array containing the user's answers
	/// const [record, setRecord] = useState([]);

	// Grab data from the appropriate JSON file
	// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
	useEffect(() => {
		const getData = () => {
			fetch(`data/${slug}.json`
			, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
			).then(function(response) {
				return response.json();
			}).then(function(myJson) {
				setContent(myJson);
			});
		}
		getData();
	},[slug]);

	// console.log(content);

	// const randomNumber = (min, max) => {
	// 	return Math.floor(Math.random() * (max - min + 1)) + min;
	// };

	// // "Collapse" content so that only one question is used per set.
	// let toUse = [];
	// content.forEach(e => {
	// 	if (e.set.setContent.length === 1) {
	// 		//console.log('just one');
	// 		toUse.push(e.set.setContent[0]);
	// 	} else {
	// 		//console.log('> one');
	// 		const n = randomNumber(0, e.set.setContent.length-1);
	// 		//console.log(n);
	// 		toUse.push(e.set.setContent[n]);
	// 	}
	// });
	// console.log(toUse);
	

	// Make sure user sees our cool animation!
	useEffect(() => {
		const setLoaded = () => {
			setIsLoading(false);
		}
		setTimeout(setLoaded, 2000);
	},[]);
		
	// Set CSS variables for color scheme
	switch (slug) {
		case 'scholarly':
			document.documentElement.style.setProperty('--light-color', '#fde2e8');
			document.documentElement.style.setProperty('--dark-color', '#e20e41');
			document.documentElement.style.setProperty('--darkest-color', LightenDarkenColor('#e20e41', -10));
			break;
		case 'evaluating':
			document.documentElement.style.setProperty('--light-color', '#f3f3f0');
			document.documentElement.style.setProperty('--dark-color', '#f36943');
			document.documentElement.style.setProperty('--darkest-color', LightenDarkenColor('#f36943', -10));
			break;
		case 'apa':
		case 'mla':
			document.documentElement.style.setProperty('--light-color', '#ffe2f3');
			document.documentElement.style.setProperty('--dark-color', '#ff169e');
			document.documentElement.style.setProperty('--darkest-color', LightenDarkenColor('#ff169e', -10));
			break;
		case 'plagiarism':
			document.documentElement.style.setProperty('--light-color', '#d4f1f2');
			document.documentElement.style.setProperty('--dark-color', '#288285');
			document.documentElement.style.setProperty('--darkest-color', LightenDarkenColor('#288285', -10));
			break;
		default:
			document.documentElement.style.setProperty('--light-color', '#ccc');
			document.documentElement.style.setProperty('--dark-color', '#333');
			document.documentElement.style.setProperty('--darkest-color', LightenDarkenColor('#333333', -10));
	}


	// navigation between slides
	const handleSlideChange = (next, numberOfSlides) => {
		// const freezableTypes = ['classify', 'multipleChoice', 'textAnswer', 'order', 'range', 'tagIt', 'dragText'];
		//const nextType = content[next].type;

		// let seen = false;

		// record.forEach(e => {
		// 	if (e.slideId === next) {
		// 		seen = true;
		// 	}
		// });

		// if ( !freezableTypes.includes(nextType) || seen ) {
		// 	setNavFrozen(false);
		// } else {
		// 	setNavFrozen(true);
		// }

		if (next >= 0 && next <= numberOfSlides) {
			setCurrentSlide(next);
			// setTried(false);
			// setFeedback('');
		}
		//console.log(record);
	}

	// const recordAnswer = (currentSlide, contentId, answer, isCorrect) => {

	// 	const answerObj = {
	// 		setId
	// 	};
	// 	setRecord()
	// 	// this.setState(state => {
	// 	// 	const answerObj = {
	// 	// 		slideId: this.state.currentSlide,
	// 	// 		contentId: contentId,
	// 	// 		firstAnswer: answer,
	// 	// 		firstAnswerCorrect: isCorrect
	// 	// 	};
	// 	// 	const record = state.record.concat(answerObj);
	// 	// 	return { record	};
	// 	// });
	// }

	// freezeNav = () => {
	// 	this.setState({ navFrozen : true });
	// }

	// thawNav = () => {
	// 	this.setState({ navFrozen : false });
	// }


	if (isLoading) {
		return (
			<div className={'App ' + slug}>
				<Splash />
			</div>
		)
	} else {
	 	return (
	 		<Fragment>
				{content.map((s, i) => 
					<Slide 
						key={i}
						slideId={i}
						currentSlide={currentSlide}
						content={content[i]}
						// recordAnswer={recordAnswer}
						// freezeNav={freezeNav}
						// thawNav={thawNav}
						// record={record}
					/>
				)}
				<Navigation 
					currentSlide={currentSlide}
					numberOfSlides={content.length} 
					onNavEvent={handleSlideChange} 
					//navFrozen={navFrozen}
				/>
			</Fragment>
	 	);
	}

}

export default App;
