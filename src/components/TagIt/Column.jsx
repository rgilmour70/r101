import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Droppable } from 'react-beautiful-dnd';

const ItemsContainer = styled.div`
	background-color: #fff;
`;

const ItemSet = styled.div`
	background-color: var(--light-color);
	padding: 1em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

const Container = styled.div`
	display: inline;
`;

const ItemList = styled.div`
	padding: 8px;
	display: block;
	float: left;
	height: 100px;
	background-color: ${ props => props.isDraggingOver ? '#ccc' : 'white'};
`;


class Column extends Component {
	render() {

		if (this.props.type === 'source-area') {
			return(
				<ItemsContainer>
					<Droppable droppableId={this.props.column.id} direction="horizontal">
						{provided => (
							<ItemSet
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
									{this.props.items.map( (item, index) => <Item key={item.id} item={item} index={index} />)}
									{provided.placeholder}
								
							</ItemSet>
						)}
					</Droppable>
				</ItemsContainer>
			);
		} else {
			return(
				<Container className="tag-destination">
					<Droppable droppableId={this.props.column.id}>
						{ (provided, snapshot) => (
							<ItemList
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{this.props.items.map( (item, index) => <Item key={item.id} item={item} index={index} />)}
								{provided.placeholder}
							</ItemList>
						)}
					</Droppable>
				</Container>
			);
		}
	}
}

export default Column;