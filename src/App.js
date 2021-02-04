// eslint-disable-next-line
import React, { Fragment, useState, useEffect } from 'react';
import './App.scss';
// import ProgressBar from './components/progressBar';
import Slide from './components/Slide';
import Navigation from './components/Navigation';
// import  GetContent  from './utils/DataService';
import Splash from './components/Splash';

const queryString = require('query-string');

const App = () => {

	const tutorialSlug = queryString.parse(window.location.search).t;

	const [slug, setSlug] = useState(tutorialSlug);
	const [currentSlide, setCurrentSlide] = useState(0); // really current set
	const [isLoading, setIsLoading] = useState(false);
	const [navFrozen, setNavFrozen] = useState(false);
	const [record, setRecord] = useState([]);
	const [content, setContent] = useState([]);

	useEffect(() => {
		// Grab data from the appropriate JSON file
		// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
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


	console.log(content);


	// I wish I could do this in the CSS!
	switch (slug) {
		case 'scholarly': 
			document.body.style.backgroundColor = "#e20e41";
			break;
		case 'evaluating':
			document.body.style.backgroundColor = "#f36943";
			break;
		case 'apa':
		case 'mla':
			document.body.style.backgroundColor = "#ff169e";
			break;
		case 'plagiarism':
			document.body.style.backgroundColor = "#288285";
			break;
		default:
			document.body.style.backgroundColor = "#ccc";
	}


	// navigation between slides
	// handleSlideChange = (next, numberOfSlides) => {
	// 	const freezableTypes = ['classify', 'multipleChoice', 'textAnswer', 'order', 'range', 'tagIt', 'dragText'];
	// 	const nextType = this.state.content[next].type;

	// 	let seen = false;

	// 	this.state.record.forEach((e) => {
	// 		if (e.slideId === next) {
	// 			seen = true;
	// 		}
	// 	});

		// if ( !freezableTypes.includes(nextType) || seen ) { // or question registered in record?
		// 	this.setState({	navFrozen: false });
		// } else {
		// 	this.setState({ navFrozen: true });
		// }

		// if (next >= 0 && next <= numberOfSlides) {
		// 	this.setState({ 
		// 		currentSlide: next, 
		// 		tried: false, 
		// 		feedback:'', 
		// 		sliderValue: 0
		// 	});
		// }
		// console.log(this.state.record);
	//}

	// recordAnswer = (currentSlide, contentId, answer, isCorrect) => {
	// 	this.setState(state => {
	// 		const answerObj = {
	// 			slideId: this.state.currentSlide,
	// 			contentId: contentId,
	// 			firstAnswer: answer,
	// 			firstAnswerCorrect: isCorrect
	// 		};
	// 		const record = state.record.concat(answerObj);
	// 		return { record	};
	// 	});
	// }

	// freezeNav = () => {
	// 	this.setState({ navFrozen : true });
	// }

	// thawNav = () => {
	// 	this.setState({ navFrozen : false });
	// }

	// delays loading to allow for splash screen
	// componentDidMount() {
	// 	const setLoaded = () => {
	// 		this.setState({ isLoading : false });
	// 	}
	// 	setTimeout(setLoaded, 2000);
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
					slideNumber={currentSlide} 
					numberOfSlides={content.length} 
					//onNavEvent={handleSlideChange} 
					navFrozen={navFrozen}
				/>
			</Fragment>
	 	);
	}

}

export default App;
