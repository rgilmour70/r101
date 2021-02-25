import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ReactHtmlParser from 'react-html-parser';

class Item extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.item.id} index={this.props.index}>
				{ (provided, snapshot) => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						// isDragging={snapshot.isDragging}
						className="drag"
					>
						{ReactHtmlParser(this.props.item.content)}
					</div>
				)}
			</Draggable>
		);
	}
}

export default Item;