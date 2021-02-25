import React, { Component } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Droppable } from 'react-beautiful-dnd';

const ItemsContainer = styled.div`
	background-color: #fff;
`;

const ItemSet = styled.div`
	background-color: #fde2e8;
	padding: 1em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`;

// const Container = styled.div`
// 	margin: 3px;
// 	border: 1px solid lightgrey;
// 	border-radius: 2px;
// 	width: 90%;
// 	display: inline-block;
// 	vertical-align: top;
// `;

const Container = styled.div`
	margin: 3px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 90%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	vertical-align: top;
	width: 100%;
`;

const ItemList = styled.div`
	padding: 8px;
	height: 250px;
	background-color: ${ props => props.isDraggingOver ? '#ccc' : 'white'};
	transition: background-color 0.6s ease;
`;


class Column extends Component {
	render() {

		if (this.props.type === 'source-area') {
			return(
				<ItemsContainer className="source">
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
				<Container className="destination">
					<Droppable droppableId={this.props.column.id} direction="horizontal">
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