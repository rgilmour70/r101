import React, { Component } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Feedback from './feedback';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const Container = styled.div`
	display: inline;
	background-color: ${ props => (props.isDragging ? '#ffc0e5' : 'white') };
`;

const OrderTextItemText = styled.div`
	display: inline;
`;

class OrderText extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items : this.props.content.items,
			tried : false,
			contentId : this.props.content.contentId,
			correctOrder : this.props.content.correctOrder,
			correctResponse : this.props.content.correctResponse,
			incorrectResponse : this.props.content.incorrectResponse,
			answer : null,
			response: ''
		}
		this.recordAnswer = props.recordAnswer;
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


	onFinish = () => {
		
		const firstAnswer = JSON.stringify(this.state.items.map((obj, i) => obj.id));

		const isCorrect = firstAnswer === JSON.stringify(this.state.correctOrder);

		let response = isCorrect ? this.state.correctResponse : this.state.incorrectResponse;

		this.setState({ response: response, tried: true, answer: firstAnswer });

		if (!this.state.tried) {
			this.recordAnswer(this.state.currentSlide, this.state.contentId, firstAnswer, isCorrect);
		}
		
	};

	render() {
		return (
			<React.Fragment>
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
												<OrderTextItemText>
													{ReactHtmlParser(item.name)}
												</OrderTextItemText>
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

	}


}

export default OrderText;