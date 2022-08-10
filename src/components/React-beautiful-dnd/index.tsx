/**
 * React Beautiful DND
 */
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

export default function DragTest () {

  const handleDragStart = () => {};

  const handleDragUpdate = () => {};

  const handleDragEnd = () => {};

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}>
      <div>Hello Drag Me</div>
    </DragDropContext>
  );
}
