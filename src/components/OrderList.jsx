import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Feedback from './Feedback';
import { getEditDistance } from '../utils/levenshtein';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const Container = styled.div`
    background-color: ${ props => (props.isDragging ? '#ccc' : 'white') };
`;

const OrderListItemText = styled.div`
	display: table-cell;
	vertical-align: top;
	padding: 0.6em;
`;

const OrderListItemNumber = styled.div`
	float: right;
	color: white;
	font-size: 1.5em;
	background: var(--dark-color);
	padding: 6px 10px;
	border-radius: 50%;
	font-family: monospace;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
	opacity: 0;
`;

class OrderList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slideId: this.props.slideId,
			items : this.props.content.items,
			tried : false,
			contentId : this.props.content.contentId,
			correctOrder : this.props.content.correctOrder,
			goodResponse : this.props.content.goodResponse,
			badResponse : this.props.content.badResponse,
			answer : null,
			response: ''
		}
		this.recordAnswer = props.recordAnswer;
		this.thawNav = props.thawNav;
	}


	onDragEnd = (result) => {
    // dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items,
		});

	};


	onFinish = (e) => {

		this.thawNav();
		
		const firstAnswer = JSON.stringify(this.state.items.map((obj, i) => obj.id));

		const ourAnswer = JSON.stringify(this.state.correctOrder);

		const lev = getEditDistance(firstAnswer, ourAnswer);

		let response = '';

		if (lev === 0) {
			response = this.state.perfectResponse;
		} else if (lev > 0 && lev <= 2) {
			response = this.state.goodResponse;
		} else {
			response = this.state.badResponse;
		}

		const isCorrect = firstAnswer === ourAnswer;

		const parentElement = e.target.closest('.shown');
		const theNumbers = parentElement.getElementsByClassName('correctPosition');

		// order the elements by correct sequence of sources
		const theNumbersInOrder = [];

		[].slice.call(theNumbers).sort(function(a, b) {
			return a.textContent.localeCompare(b.textContent);
		}).forEach(function(val, index) {
			theNumbersInOrder.push(val);
		});

		// unhide the correct numbers
		let interval = 300;
		for (let i=0; i<theNumbersInOrder.length; i++) {
			setTimeout(() => {theNumbersInOrder[i].classList.add('reveal')}, interval);
			interval += 300;
		}

		this.setState({ response: response, tried: true, answer: firstAnswer });

		if (!this.state.tried) {
			this.recordAnswer(this.state.slideId, this.state.contentId, firstAnswer, isCorrect);
		}
		
	};

	render() {
		return (
			<div className={  this.props.display ? 'shown' : 'hidden' }>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Droppable droppableId="droppable">
						{(provided, snapshot) => (
							<div ref={provided.innerRef}>
								{this.state.items.map((item, index) => (
									<Draggable key={item.id} draggableId={'' + item.id} index={index}>
										{(provided, snapshot) => 
											<Container
												className={'order-list-item ' + item.type}
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												isDragging={snapshot.isDragging}
											>
												<OrderListItemText>
													{ReactHtmlParser(item.name)}
													<OrderListItemNumber className="correctPosition">
														{item.correctPosition}
													</OrderListItemNumber>
												</OrderListItemText>
											</Container>
										}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<button onClick={this.onFinish} className="btn btn-light check-answer">Check Answer</button>
				<Feedback response={this.state.response} />
			</div>
		);

	}


}

export default OrderList;