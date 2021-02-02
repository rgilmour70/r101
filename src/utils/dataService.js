import { useEffect } from 'react';
// import myData from '../data/bowie.json';

// export const sets = myData;  // array of set objects

const GetContent = () => {

	useEffect(() => {
		const script = document.createElement('script');
		script.src = "./data/bowie.js";
		script.async = true;
		document.body.appendChild(script);
		return () => {
		  document.body.removeChild(script);
		}
	}, []);

	let contentToUse = ['mango'];

	// pick a question from each set
	// for (let i=0; i<sets.length; i++) {

	// 	if (sets[i].set.userChoice) {

	// 		const numberOfOptions = sets[i].set.setContent.length;
	// 		for (let j=0; j<numberOfOptions; j++) {
	// 			contentToUse[i] = {
	// 				contentId: null,
	// 				type: 'userChoice',
	// 				setContent: sets[i].set.setContent
	// 			}
	// 		}

	// 	} else {
	// 		const numberOfContentUnitsInSet = sets[i].set.setContent.length;
	// 		const pickedNumber = randomNumber(0, numberOfContentUnitsInSet - 1);
	// 		contentToUse[i] = sets[i].set.setContent[pickedNumber];
	// 	}
	// }

	console.log(contentToUse);
	return contentToUse;
}

const randomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default GetContent;