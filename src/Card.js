import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  // Return the data describing the dragged item
  beginDrag(props) {
    return {
      id: props.id,
      // Not mutated
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: draggedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    // If drop was cancelled, move it back
    if (!didDrop) {
      props.moveCard(draggedId, originalIndex);
    }
  },
};

const cardTarget = {
  // canDrop() {
  //   return false;
  // },

  hover(props, monitor, component) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: dragIndex } = props.findCard(draggedId);
      const { index: hoverIndex } = props.findCard(overId);

      // Determine rectangle on screen
      const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

      // Get horizontal middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items width
      // When dragging rightwards, only move when the cursor is after 50%
      // When dragging leftwards, only move when the cursor is before 50%

      const isDraggingRightwards = dragIndex < hoverIndex
      const isHoverBeforeMiddle = hoverClientX < hoverMiddleX
      const isDraggingLeftwards = dragIndex > hoverIndex
      const isHoverAfterMiddle = hoverClientX > hoverMiddleX

      if (isDraggingRightwards && isHoverAfterMiddle || isDraggingLeftwards && isHoverBeforeMiddle) {
        // Time to actually perform the action
        props.moveCard(draggedId, hoverIndex);
      }

    }
  },
};

export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(class Card extends Component {
  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(connectDropTarget(React.createElement(
      'div',
      { style: { ...style, opacity } },
      text
    )));
  }
}));
