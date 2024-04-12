import { useState, useCallback } from 'react'
import { DragState } from './type'

/**
 * A custom React hook that facilitates drag-and-drop operations.
 * It tracks the dragging state and the data being dragged.
 *
 * @typeparam T The type of the data involved in the drag-and-drop operation.
 * @returns An object containing the drag state, and functions to start and end the drag.
 *
 **/

export function useDragAndDrop<T>() {
  const [dragState, setDragState] = useState<DragState<T>>({
    isDragging: false,
    draggedData: null
  })

  const handleDragStart = useCallback((data: T) => {
    setDragState({ isDragging: true, draggedData: data })
  }, [])

  const handleDragEnd = useCallback(() => {
    setDragState({ isDragging: false, draggedData: null })
  }, [])

  return {
    ...dragState,
    handleDragStart,
    handleDragEnd
  }
}
