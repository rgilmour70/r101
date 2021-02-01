// eslint-disable-next-line
import React, { useState } from 'react';
import './App.scss';
// import ProgressBar from './components/progressBar';
// import Slide from './components/slide';
// import Navigation from './components/navigation';
import { getSelectedContent } from './utils/dataService';
import Splash from './components/Splash';

const queryString = require('query-string');

const App = () => {

	const tutorialSlug = queryString.parse(window.location.search).t;

	const [slug, setSlug] = useState(tutorialSlug);
	const [lightColor, setLightColor] = useState('');
	const [currentSlide, setCurrentSlide] = useState(0); // really current set
	const [isLoading, setIsLoading] = useState(true);
	const [navFrozen, setNavFrozen] = useState(false);
	const [record, setRecord] = useState([]);
	const [content, setContent] = useState([]);

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

	//if (isLoading) {
		return (
			<div className={'App ' + slug}>
				<Splash />
			</div>
		)
	//} // else {
	// 	return (
	// 		<Fragment>
	// 			<ProgressBar 
	// 				currentSlide={this.state.currentSlide}
	// 				numberOfSlides={this.state.content.length}
	// 			/>
	// 			{this.state.content.map((s, i) => 
	// 				<Slide 
	// 					key={i}
	// 					slideId={i}
	// 					currentSlide={this.state.currentSlide}
	// 					content={this.state.content[i]}
	// 					recordAnswer={this.recordAnswer}
	// 					freezeNav={this.freezeNav}
	// 					thawNav={this.thawNav}
	// 					record={this.state.record}
	// 				/>
	// 			)}
	// 			<Navigation 
	// 				slideNumber={this.state.currentSlide} 
	// 				numberOfSlides={this.state.content.length} 
	// 				onNavEvent={this.handleSlideChange} 
	// 				navFrozen={this.state.navFrozen}
	// 			/>
	// 		</Fragment>
	// 	);
	// }

}

export default App;
