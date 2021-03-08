import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	display: inline-block;
	padding: 0 8px;
	border-radius: 500px;
	margin: 10px;
	text-align: left;
	background-color: var(--dark-color);
	color: white;
	box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
	min-height: 0;
	max-width: 200px;
	padding: 0.6em;
	&::before {
		content: "# ";
		color: var(--light-color);
	}
`;

class Item extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.item.id} index={this.props.index}>
				{ (provided, snapshot) => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						className="drag-tag"
					>
						{this.props.item.content}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Item;