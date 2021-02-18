import React from 'react';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';
import MultipleChoice from './MultipleChoice';
import TextAnswer from './TextAnswer';
import Range from './Range';
// import OrderList from './OrderList';
import Classify from './Classify/Classify';
import UserChoice from './UserChoice';
// import ModalLink from './modalLink';
// import Mnemonic from './mnemonic';
import Declarative from './Declarative';
import TagIt from './TagIt/TagIt';
// import SubmitForm from './submitForm';

const Slide = (props) => {
	
	const { slideId, currentSlide, content } = props;

	let displayClass = 'content ';
	if (slideId === currentSlide) {
		displayClass += 'shown';
	} else {
		displayClass += 'hidden';
	}

	// const imagePath = content.image ? require('../images/' + content.image) : '';
	
	 switch(content.type) {

		case 'multipleChoice':
			return (
				<div className={displayClass} id={'s' + slideId}>
					<div className="text">{renderHTML(content.text)}</div>
					<MultipleChoice {...props} />
				</div>
			);

		case 'textAnswer':
			return (
				<div className={displayClass} id={'s' + slideId}>
					<div className="text">{renderHTML(content.text)}</div>
					<TextAnswer {...props} />
				</div>
			);

		case 'range':
			return (
				<div className={displayClass} id={'s' + slideId}>
					<div className="text">{renderHTML(content.text)}</div>
					<Range {...props} />
				</div>
			);

		// case 'orderList':
		// 	return (
		// 		<div className={displayClass} id={'s' + slideId}>
		// 			<div className="text">{renderHTML(content.text)}</div>
		// 			<OrderList {...props} />
		// 		</div>
		// 	);

		case 'classify':
			return (
				<div className={displayClass} id={'s' + slideId}>
					<div className="text">{renderHTML(content.text)}</div>
					<Classify {...props} />
				</div>
			);

	// 	case 'dragText':
	// 		return (
	// 			<div className={displayClass} id={'s' + slideId}>
	// 				<div className="text">{renderHTML(content.text)}</div>
	// 				<DragText {...props} />
	// 			</div>
	// 		);

		// case 'userChoice':
		// 	return (
		// 		<div className={displayClass} id={'s' + slideId}>
		// 			<UserChoice {...props} />
		// 		</div>
		// 	);

	// 	case 'mnemonic':
	// 		return (
	// 			<div className={displayClass} id={'s' + slideId}>
	// 				<Mnemonic {...props} />
	// 			</div>
	// 		);
			
		case 'tagIt' :
			return (
				<div className={displayClass} id={'s' + slideId}>
					<div className="text">{renderHTML(content.text)}</div>
					<TagIt {...props} />
				</div>	
			);

	// 	case 'submitForm':
	// 		return (
	// 			<div className={displayClass} id={'s' + slideId}>
	// 				<div className="text">{renderHTML(content.text)}</div>
	// 				<SubmitForm {...props} />
	// 			</div>
	// 		);
			
		case 'declarative':
			return (
				<div className={displayClass} id={'s' + slideId}>
					<Declarative {...props} />
				</div>
			);

		default:
			return (
				<div className={displayClass} id={'s' + slideId}>
					<Declarative {...props} />
				</div>
			);
	}

}

Slide.propTypes = {
	slideId: PropTypes.number.isRequired,
	currentSlide: PropTypes.number.isRequired,
	content: PropTypes.object.isRequired
};

export default Slide;