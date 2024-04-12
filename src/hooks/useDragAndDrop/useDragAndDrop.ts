import { useState, useCallback } from 'react'
import { DragState } from './type'

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
