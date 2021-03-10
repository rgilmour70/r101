import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import Feedback from '../Feedback';

const Container = styled.div`
	display: block;
`;

class Classify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			contentId: this.props.content.contentId,
			slideId: this.props.slideId,
			currentSlide: this.props.currentSlide,
			items: this.props.content.items,
			columns: this.props.content.columns,
			columnOrder: this.props.content.columnOrder,
			correctAnswer: this.props.content.correctAnswer,
			response: '',
			correctResponse: this.props.content.correctResponse,
			incorrectResponse: this.props.content.incorrectResponse,
			incompleteResponse: 'Please drag all items into the columns below.',
			tried: false,
			correct: false
		}
		this.recordAnswer = props.recordAnswer;
		this.thawNav = props.thawNav;
	}


	onDragEnd = result => {

		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		if (start === finish) {

			// move within column
			const newResourceIds = Array.from(start.itemIds);
			newResourceIds.splice(source.index, 1);  // remove item
			newResourceIds.splice(destination.index, 0, draggableId);  // insert item

			const newColumn = {
				...start,
				itemIds: newResourceIds
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn 
				}
			};

			this.setState(newState);
			return;

		}

		const startResourceIds = Array.from(start.itemIds);
		startResourceIds.splice(source.index, 1);
		const newStart = {
			...start,
			itemIds: startResourceIds
		};


		const finishTaskIds = Array.from(finish.itemIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			itemIds: finishTaskIds
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish
			},
			somethingDragged: true
		};

		this.setState(newState);

	};


	onFinish = () => {

		this.setState({ tried: true });

		const correctnessObj = {};
		const correctResponse = this.state.correctResponse;
		const incorrectResponse = this.state.incorrectResponse;
		const incompleteResponse = this.state.incompleteResponse;
		const cols = this.state.columns;

		for (let i=1; i<=this.state.columnOrder.length; i++) {

			let k = 'column-' + i;

			let answerKey = JSON.stringify(this.state.correctAnswer[k].itemIds.sort());
			let userInput = JSON.stringify(this.state.columns[k].itemIds.sort());

			correctnessObj[k] = answerKey === userInput;

		}

		const originColContents = cols['column-1'].itemIds;

		const isCorrect = Object.values(correctnessObj).every(Boolean);

		const answerString = JSON.stringify(correctnessObj);

		if (originColContents.length === 0) { // they at least did something
			this.thawNav();
			if (isCorrect) {
				this.setState({ correct: isCorrect, response: correctResponse });
			} else {
				this.setState({ correct: isCorrect, response: incorrectResponse });
			}
		} else {
			this.setState({ response: incompleteResponse });
		}

		if (!this.state.tried) {
			this.recordAnswer(this.state.slideId, this.state.contentId, answerString, isCorrect);
		}

	};


	render() {
		return (
			<React.Fragment>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Container>
						{this.state.columnOrder.map( (columnId, index) => {
							const column = this.state.columns[columnId];
							const items = column.itemIds.map( itemId => this.state.items[itemId]);

							if (index === 0) {
								return (
									<Column key={column.id} column={column} items={items} type="source-area" />
								);
							} else {
								return (
									<Column 
										key={column.id} 
										column={column} 
										items={items} 
										type="destination-area" 
										numberOfDestinationColumns={this.props.content.columnOrder.length - 1}
									/>
								);
							}
						})}
					</Container>
				</DragDropContext>
				<button onClick={this.onFinish} className="btn btn-light check-answer">Check Answer</button>
				<Feedback response={this.state.response} />
			</React.Fragment>
		)
	}

}

export default Classify;
