// eslint-disable-next-line
import React, { Component } from 'react';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
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
	background-color: ${ props => (props.isDragging ? '#ffb2a9' : 'white') };
`;

const OrderListItemText = styled.div`
	display: table-cell;
	padding: 0 1.4em 0.5em 1.5em;
`;

const OrderListItemNumber = styled.div`
	float: right;
	color: white;
	font-size: 1.5em;
	background: #fa7268;
	padding: 2px 12px;
	border-radius: 50%;
	font-family: monospace;
	box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
	opacity: 0;
`;



class Order extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items : this.props.items,
			text: this.props.text,
			tried : false,
			contentId : this.props.contentId,
			correctOrder : this.props.correctOrder,
			perfectResponse : this.props.perfectResponse,
			goodResponse : this.props.goodResponse,
			badResponse : this.props.badResponse,
			answer : null,
			response: '',
			display: this.props.display
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

		const n = this.state.correctOrder.length;

		let response = '';

		if (lev === 0) {
			response = this.state.perfectResponse;
		} else if (lev <= n/2) {
			response = this.state.goodResponse;
		} else {
			response = this.state.badResponse;
		}

		this.setState({ response: response, tried: true, answer: firstAnswer });

		const parentElement = e.target.closest('.uc-question-area');
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

		if (!this.state.tried) {
			this.recordAnswer(this.state.currentSlide, this.state.contentId, firstAnswer, lev);
		}
		
	};

	render() {
		if (this.props.display) {
			return (
				<React.Fragment>
					<p>{this.state.text}</p>
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="droppable">
							{(provided, snapshot) => (
								<div ref={provided.innerRef}>
									{this.state.items.map((item, index) => (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided, snapshot) => 
												<Container
													className={'order-list-item ' + item.type}
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													isDragging={snapshot.isDragging}
												>
													<OrderListItemText>
														<OrderListItemNumber className="correctPosition">{item.correctPosition}</OrderListItemNumber>
														{renderHTML(item.name)}
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
				</React.Fragment>
			);
		} else {
			return null;
		}

	}


}

export default Order;