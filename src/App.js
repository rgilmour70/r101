import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import ProgressBar from './components/ProgressBar';
import Slide from './components/Slide';
import Navigation from './components/Navigation';
import Splash from './components/Splash';
import 'react-rangeslider/lib/index.css';

const queryString = require('query-string');

const App = () => {

	const tutorialTitles = {
		apa : "APA Citation Style",
		mla : "MLA Citation Style",
		plagiarism : "Plagiarism",
		scholarly : "Scholarly Publications",
		evaluating : "Evaluating Sources"
	}

	const tutorialSlug = queryString.parse(window.location.search).t || 'plagiarism';
	document.title = tutorialTitles[tutorialSlug] || 'plagiarism';

	// eslint-disable-next-line
	const [slug, setSlug] = useState(tutorialSlug);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [numberOfSlides, setNumberOfSlides] = useState(0);
	const [theContent, setTheContent] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [navFrozen, setNavFrozen] = useState(false);

	// The record is an array containing the user's answers
	const [record, setRecord] = useState([]);

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	/* Grab data from the appropriate JSON file */
	useEffect(() => {
		let toUse = [];
		let numberOfSets = 0;
		const getData = () => {
			fetch(`./data/${slug}.json`
			, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
			).then(function(response) {
				return response.json();
			}
			).then(function(myJson) {
				// if needed, choose a single question from each set
				myJson.forEach((o) => {
					if (o.set.setContent.length === 1) {
						toUse.push(o.set.setContent[0]);
					} else {
						// slurp in the whole
						// set for user choice
						if (o.set.userChoice) {
							toUse.push({
								contentId: null,
								type: 'userChoice',
								setContent: o.set.setContent
							});
						} else {
							const n = randomNumber(0, o.set.setContent.length-1);
							toUse.push(o.set.setContent[n]);
						}
					}
					numberOfSets++;
				});
				setNumberOfSlides(numberOfSets);
			});
		};
		getData();
		// slideContent contains only the questions selected for use
		setTheContent(toUse);
	},[slug]);


	// console.log(theContent);

	
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
			document.documentElement.style.setProperty('--darkest-color', '#c20c38');
			break;
		case 'evaluating':
			document.documentElement.style.setProperty('--light-color', '#fedddb');
			document.documentElement.style.setProperty('--dark-color', '#fa7268');
			document.documentElement.style.setProperty('--darkest-color', '#f95347');
			break;
		case 'apa':
		case 'mla':
			document.documentElement.style.setProperty('--light-color', '#cce3fc');
			document.documentElement.style.setProperty('--dark-color', '#0c77f1');
			document.documentElement.style.setProperty('--darkest-color', '#0b6fe1');
			break;
		case 'plagiarism':
			document.documentElement.style.setProperty('--light-color', '#d4f1f2');
			document.documentElement.style.setProperty('--dark-color', '#288285');
			document.documentElement.style.setProperty('--darkest-color', '#1c5c5e');
			break;
		default:
			document.documentElement.style.setProperty('--light-color', '#cce3fc');
			document.documentElement.style.setProperty('--dark-color', '#0c77f1');
			document.documentElement.style.setProperty('--darkest-color', '#0b6fe1');
	}

	const thawNav = () => {
		setNavFrozen(false);
	}

	// increment progress bar
	const moveProgressBar = (howFar) => {
		document.getElementById('progress-bar').style.width = howFar + '%';
	}

	// navigation between slides
	const handleSlideChange = (next, numberOfSlides) => {
		const freezableTypes = ['classify', 'multipleChoice', 'textAnswer', 'orderList', 'range', 'tagIt', 'dragText'];
		const nextType = theContent[next].type;

		const howFar = (next + 1) / numberOfSlides * 100;

		if ( !freezableTypes.includes(nextType) ) {
			setNavFrozen(false);
		} else {
			setNavFrozen(true);
		}

		if (next >= 0 && next <= numberOfSlides) {
			setCurrentSlide(next);
			moveProgressBar(howFar);
		}

	}

	const recordAnswer = (currentSlide, contentId, answer, isCorrect) => {
		const answerObj = {
			slideId: currentSlide,
			contentId: contentId,
			firstAnswer: answer,
			firstAnswerCorrect: isCorrect
		};
		// setRecord(newRecord);
		setRecord((prevState) => prevState.concat(answerObj));

	}

	if (isLoading) {
		return (
			<div className={'App ' + slug}>
				<Splash />
			</div>
		)
	} else {
	 	return (
	 		<Fragment>
	 			<ProgressBar 
	 				currentSlide={currentSlide}
	 				numberOfSlides={numberOfSlides}
	 			/>
				{theContent.map((s, i) => 
					<Slide 
						key={i}
						slideId={i}
						slug={slug}
						currentSlide={currentSlide}
						content={theContent[i]}
						record={record}
						recordAnswer={recordAnswer}
						thawNav={thawNav}
					/>
				)}
				<Navigation 
					currentSlide={currentSlide}
					numberOfSlides={theContent.length} 
					onNavEvent={handleSlideChange} 
					navFrozen={navFrozen}
				/>
			</Fragment>
	 	);
	}

}

export default App;
