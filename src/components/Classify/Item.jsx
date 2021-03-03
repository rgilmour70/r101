import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	display: inline-block;
	padding: 5px;
	border-radius: 10px;
	margin: 2px;
	margin-bottom: 5px;
	text-align: center;
	background-color: var(--dark-color);
	color: white;
	font-weight: bold;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, .4);
	min-height: 0;
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
					>
						{this.props.item.content}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Item;