import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from '@emotion/styled'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'
import ContextMenu from './ContextMenu'

const BoardContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);
  transition: background-color 0.3s ease;
  position: relative;
`

const Board = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.background};
  background-image: ${props => props.showGrid ? 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)' : 'none'};
  background-size: ${props => props.showGrid ? '20px 20px' : '0'};
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
`

const Element = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  border: ${props => props.isSelected ? '2px solid var(--primary-color)' : 'none'};
  border-radius: 2px;
  z-index: ${props => props.zIndex};
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  box-shadow: ${props => props.isSelected ? '0 0 0 2px rgba(98, 0, 234, 0.2), 0 5px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  opacity: ${props => props.isDragging ? 0.5 : 1};
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`

const ImageElement = styled.img`
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  display: block;
  opacity: ${props => props.isLoading ? 0.5 : 1};
`

const ResizeHandle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  opacity: 0.9;
  
  &.se {
    bottom: -5px;
    right: -5px;
    cursor: se-resize;
  }
  
  &.sw {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }
  
  &.ne {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }
  
  &.nw {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }
  
  &.e {
    top: 50%;
    right: -5px;
    transform: translateY(-50%);
    cursor: e-resize;
  }
  
  &.w {
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
    cursor: w-resize;
  }
  
  &.n {
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: n-resize;
  }
  
  &.s {
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
  }
  
  &:hover {
    transform: scale(1.3);
    opacity: 1;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
    background-color: var(--primary-color);
    border-color: white;
  }
  
  &:active {
    transform: scale(1.1);
  }
`

const ImageLoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
`

const TextElement = styled.div`
  padding: 8px;
  min-width: 50px;
  min-height: 30px;
  font-family: ${props => props.fontFamily || 'inherit'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  font-style: ${props => props.fontStyle || 'normal'};
  color: ${props => props.color || '#000000'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  text-align: ${props => props.textAlign || 'left'};
  line-height: 1.4;
  letter-spacing: ${props => props.letterSpacing || 'normal'};
  text-shadow: ${props => props.textShadow || 'none'};
  border-radius: 2px;
  overflow: hidden;
  transition: color 0.2s ease, background-color 0.2s ease;
  cursor: ${props => props.isEditing ? 'text' : 'inherit'};
`

const ColorElement = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

const ShapeElement = styled.div`
  width: ${props => props.width.toString().includes('%') ? props.width : `${props.width}px`};
  height: ${props => props.height.toString().includes('%') ? props.height : `${props.height}px`};
  background-color: ${props => props.backgroundColor};
  border: ${props => (props.borderWidth > 0) ? `${props.borderWidth}px solid ${props.borderColor}` : 'none'};
  border-radius: ${props => props.shapeType === 'circle' ? '50%' : props.shapeType === 'rectangle' ? '4px' : '0'};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`

const LineElement = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.borderWidth}px;
  background-color: ${props => props.borderColor};
  transform: ${props => props.angle ? `rotate(${props.angle}deg)` : 'none'};
  transform-origin: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`

const EditableTextInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 8px;
  border: none;
  outline: none;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  font-style: inherit;
  color: inherit;
  background-color: inherit;
  text-align: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  text-shadow: inherit;
  border-radius: 2px;
  overflow: hidden;
`

const GridToggle = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: white;
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`

const SnapIndicator = styled.div`
  position: absolute;
  background-color: rgba(98, 0, 234, 0.2);
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.2s ease;
`

function MoodBoard({ elements, updateElement, selectElement, selectedElement, boardBackground, canvasSize, addElement, deleteElement, drawingMode, setDrawingMode, shapeColor, shapeBorderColor, shapeBorderWidth }) {
  const [showGrid, setShowGrid] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingTextId, setEditingTextId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingShape, setDrawingShape] = useState(null);
  const textInputRef = useRef(null);
  const boardRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!drawingMode) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - boardRect.left;
    const y = e.clientY - boardRect.top;

    setDrawingShape({
      type: 'shape',
      shapeType: drawingMode,
      position: { x, y },
      width: 0,
      height: 0,
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderColor: 'rgba(0,0,0,0.5)',
      borderWidth: 1,
      zIndex: elements.length + 1, // Ensure it's on top
    });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !drawingShape) return;

    const boardRect = boardRef.current.getBoundingClientRect();
    const currentX = e.clientX - boardRect.left;
    const currentY = e.clientY - boardRect.top;

    setDrawingShape(prev => ({
      ...prev,
      width: Math.abs(currentX - prev.position.x),
      height: Math.abs(currentY - prev.position.y),
    }));
  };

  const handleMouseUp = () => {
    if (isDrawing && drawingShape && drawingShape.width > 5 && drawingShape.height > 5) {
      const finalShape = {
        ...drawingShape,
        backgroundColor: shapeColor,
        borderColor: shapeBorderColor,
        borderWidth: shapeBorderWidth,
        zIndex: elements.length,
      };
      addElement(finalShape);
    }
    setIsDrawing(false);
    setDrawingShape(null);
    setDrawingMode(null);
  };
  const draggableRefs = useRef({});
  
  // Initialize or get ref for an element
  const getElementRef = (id) => {
    if (!draggableRefs.current[id]) {
      draggableRefs.current[id] = React.createRef();
    }
    return draggableRefs.current[id];
  };



  // Add keyboard event listener for delete key
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only delete if an element is selected and we're not editing text
      if (selectedElement && !editingTextId && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        deleteElement(selectedElement.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElement, editingTextId, deleteElement]);

  const handleDragStart = () => {
    setIsDragging(true);
  }

  const handleDragStop = (id, e, data) => {
    setIsDragging(false);
    
    // Snap to grid if grid is visible
    if (showGrid) {
      const gridSize = 20;
      const snappedX = Math.round(data.x / gridSize) * gridSize;
      const snappedY = Math.round(data.y / gridSize) * gridSize;
      updateElement(id, { position: { x: snappedX, y: snappedY } });
    } else {
      updateElement(id, { position: { x: data.x, y: data.y } });
    }
  }

  const handleElementClick = (e, id) => {
    e.stopPropagation();
    selectElement(id);
  };
  
  const handleElementContextMenu = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Select the element when right-clicked
    selectElement(id)
    
    // Get the position for the context menu
    const x = e.clientX
    const y = e.clientY
    
    // Set context menu with element ID for deletion
    setContextMenu({
      x,
      y,
      elementId: id
    })
  }
  
  const handleTextDoubleClick = (e, id, content) => {
    e.stopPropagation()
    setEditingTextId(id)
    setEditingText(content)
    // Focus will be set after the input is rendered
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus()
      }
    }, 10)
  }
  
  const handleTextInputChange = (e) => {
    setEditingText(e.target.value)
  }
  
  const handleTextInputBlur = () => {
    if (editingTextId) {
      updateElement(editingTextId, { content: editingText })
      setEditingTextId(null)
      setEditingText('')
    }
  }
  
  const handleTextInputKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleTextInputBlur()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setEditingTextId(null)
      setEditingText('')
    }
  }

  const handleBoardClick = () => {
    selectElement(null)
    // Close context menu if it's open
    if (contextMenu) {
      setContextMenu(null)
    }
  }
  
  const handleContextMenu = (e) => {
    e.preventDefault()
    // Get the position relative to the board
    const boardRect = boardRef.current.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    // Calculate position within the board
    const boardX = e.clientX - boardRect.left
    const boardY = e.clientY - boardRect.top
    
    // Set context menu position and store the board position for element placement
    setContextMenu({
      x,
      y,
      boardPosition: { x: boardX, y: boardY }
    })
  }
  
  const handleAddShape = (shapeType) => {
    if (contextMenu) {
      let newElement = {
        type: 'shape',
        shapeType: shapeType,
        position: contextMenu.boardPosition,
        width: 100,
        height: 100,
        backgroundColor: '#4285F4',
        borderColor: '#0F9D58',
        borderWidth: 0
      }
      
      // Special handling for line shape
      if (shapeType === 'line') {
        newElement = {
          ...newElement,
          height: 1,
          width: 150,
          borderWidth: 2,
          borderColor: '#000000',
          backgroundColor: 'transparent'
        }
      }
      
      addElement(newElement)
      setContextMenu(null)
    }
  }
  
  const handleDeleteElement = () => {
    if (contextMenu && contextMenu.elementId && typeof deleteElement === 'function') {
      deleteElement(contextMenu.elementId)
      setContextMenu(null)
    }
  }
  
  const handleAddText = () => {
    if (contextMenu) {
      const newElement = {
        type: 'text',
        content: 'Double-click to edit',
        fontFamily: 'Arial',
        fontSize: '16px',
        fontWeight: 'normal',
        color: '#000000',
        backgroundColor: 'transparent',
        textAlign: 'left',
        position: contextMenu.boardPosition
      }
      addElement(newElement)
      setContextMenu(null)
    }
  }
  
  const handleAddImage = () => {
    if (contextMenu) {
      // Create a file input element
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const newElement = {
              type: 'image',
              src: event.target.result,
              alt: file.name,
              position: contextMenu.boardPosition,
              width: 200,
              height: 150
            }
            addElement(newElement)
          }
          reader.readAsDataURL(file)
        }
      }
      
      input.click()
      setContextMenu(null)
    }
  }

  const handleResize = (id, e, { size }) => {
    e.stopPropagation();
    
    // Get the element being resized
    const element = elements.find(el => el.id === id);
    
    // Define minimum sizes
    const minWidth = 20;
    const minHeight = 20;
    const minLineWidth = 10;
    
    // Special handling for line shapes
    if (element && element.type === 'shape' && element.shapeType === 'line') {
      // For lines, only update the width, not the height (which is controlled by borderWidth)
      let newWidth = Math.max(size.width, minLineWidth);
      
      if (showGrid) {
        const gridSize = 20;
        newWidth = Math.max(Math.round(newWidth / gridSize) * gridSize, minLineWidth);
      }
      
      updateElement(id, { width: newWidth });
    } else {
      // For all other elements, update both width and height with minimum constraints
      let newWidth = Math.max(size.width, minWidth);
      let newHeight = Math.max(size.height, minHeight);
      
      if (showGrid) {
        const gridSize = 20;
        newWidth = Math.max(Math.round(newWidth / gridSize) * gridSize, minWidth);
        newHeight = Math.max(Math.round(newHeight / gridSize) * gridSize, minHeight);
      }
      
      updateElement(id, { width: newWidth, height: newHeight });
    }
  }

  const renderElement = (element) => {
    const { id, type, position, zIndex } = element
    const isSelected = selectedElement?.id === id
    const elementIsDragging = isDragging && isSelected
    const nodeRef = getElementRef(id)

    return (
      <Draggable
        key={id}
        position={position}
        onStart={handleDragStart}
        onStop={(e, data) => handleDragStop(id, e, data)}
        bounds="parent"
        grid={showGrid ? [20, 20] : null}
        nodeRef={nodeRef}
      >
        <Element
          ref={nodeRef}
          onClick={(e) => handleElementClick(e, id)}
          onContextMenu={(e) => handleElementContextMenu(e, id)}
          isSelected={isSelected}
          isDragging={elementIsDragging}
          zIndex={zIndex}
        >
          {type === 'image' && (
            <>
              {isSelected ? (
                <Resizable
                  width={element.width || 200}
                  height={element.height || 150}
                  onResize={(e, data) => handleResize(id, e, data)}
                  resizeHandles={['se', 'sw', 'ne', 'nw']}
                  handle={(
                    <>
                      <ResizeHandle className="se" />
                      <ResizeHandle className="sw" />
                      <ResizeHandle className="ne" />
                      <ResizeHandle className="nw" />
                    </>
                  )}
                  grid={showGrid ? [20, 20] : null}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <ImageElement 
                      src={element.src} 
                      alt={element.alt || 'Tide board image'}
                      width={element.width || 200}
                      height={element.height || 150}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        updateElement(id, { error: true });
                        console.error('Failed to load image:', element.src);
                      }}
                      style={{ display: element.error ? 'none' : 'block' }}
                      loading="lazy"
                    />
                  </div>
                </Resizable>
              ) : (
                <ImageElement 
                  src={element.src} 
                  alt={element.alt || 'Tide board image'}
                  width={element.width || 200}
                  height={element.height || 150}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    updateElement(id, { error: true });
                    console.error('Failed to load image:', element.src);
                  }}
                  style={{ display: element.error ? 'none' : 'block' }}
                  loading="lazy"
                />
              )}
              {element.error && (
                <ImageLoadingPlaceholder>
                  Failed to load image
                </ImageLoadingPlaceholder>
              )}
            </>
          )}
          {type === 'text' && editingTextId === id ? (
            <TextElement
              fontFamily={element.fontFamily}
              fontSize={element.fontSize}
              fontWeight={element.fontWeight}
              color={element.color}
              backgroundColor={element.backgroundColor}
              textAlign={element.textAlign}
              isEditing={true}
            >
              <EditableTextInput
                ref={textInputRef}
                value={editingText}
                onChange={handleTextInputChange}
                onBlur={handleTextInputBlur}
                onKeyDown={handleTextInputKeyDown}
                style={{
                  fontFamily: element.fontFamily,
                  fontSize: element.fontSize,
                  fontWeight: element.fontWeight,
                  fontStyle: element.fontStyle || 'normal',
                  color: element.color,
                  backgroundColor: element.backgroundColor,
                  textAlign: element.textAlign,
                  letterSpacing: element.letterSpacing || 'normal'
                }}
              />
            </TextElement>
          ) : type === 'text' && (
            <>
              {isSelected ? (
                <Resizable
                  width={element.width || 200}
                  height={element.height || 50}
                  onResize={(e, data) => handleResize(id, e, data)}
                  resizeHandles={['se', 'sw', 'ne', 'nw', 'e', 'w']}
                  handle={(
                    <>
                      <ResizeHandle className="se" />
                      <ResizeHandle className="sw" />
                      <ResizeHandle className="ne" />
                      <ResizeHandle className="nw" />
                      <ResizeHandle className="e" />
                      <ResizeHandle className="w" />
                    </>
                  )}
                  grid={showGrid ? [20, 20] : null}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <TextElement
                      fontFamily={element.fontFamily}
                      fontSize={element.fontSize}
                      fontWeight={element.fontWeight}
                      color={element.color}
                      backgroundColor={element.backgroundColor}
                      textAlign={element.textAlign}
                      onDoubleClick={(e) => handleTextDoubleClick(e, id, element.content)}
                      style={{ width: '100%', height: '100%', minHeight: '30px' }}
                    >
                      {element.content}
                    </TextElement>
                  </div>
                </Resizable>
              ) : (
                <TextElement
                  fontFamily={element.fontFamily}
                  fontSize={element.fontSize}
                  fontWeight={element.fontWeight}
                  color={element.color}
                  backgroundColor={element.backgroundColor}
                  textAlign={element.textAlign}
                  onDoubleClick={(e) => handleTextDoubleClick(e, id, element.content)}
                  style={{ 
                    width: element.width ? `${element.width}px` : 'auto',
                    height: element.height ? `${element.height}px` : 'auto',
                    minHeight: '30px'
                  }}
                >
                  {element.content}
                </TextElement>
              )}
            </>
          )}
          {type === 'color' && (
            <>
              {isSelected ? (
                <Resizable
                  width={element.width || 100}
                  height={element.height || 100}
                  onResize={(e, data) => handleResize(id, e, data)}
                  resizeHandles={['se', 'sw', 'ne', 'nw', 'e', 'w', 'n', 's']}
                  handle={(
                    <>
                      <ResizeHandle className="se" />
                      <ResizeHandle className="sw" />
                      <ResizeHandle className="ne" />
                      <ResizeHandle className="nw" />
                      <ResizeHandle className="e" />
                      <ResizeHandle className="w" />
                      <ResizeHandle className="n" />
                      <ResizeHandle className="s" />
                    </>
                  )}
                  grid={showGrid ? [20, 20] : null}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <ColorElement color={element.color} style={{ width: '100%', height: '100%' }} />
                  </div>
                </Resizable>
              ) : (
                <ColorElement 
                  color={element.color} 
                  style={{ 
                    width: element.width ? `${element.width}px` : '100px',
                    height: element.height ? `${element.height}px` : '100px'
                  }} 
                />
              )}
            </>
          )}
          {type === 'shape' && element.shapeType !== 'line' && (
            <>
              {isSelected ? (
                <Resizable
                  width={element.width || 100}
                  height={element.height || 100}
                  onResize={(e, data) => handleResize(id, e, data)}
                  resizeHandles={['se', 'sw', 'ne', 'nw', 'e', 'w', 'n', 's']}
                  handle={(
                    <>
                      <ResizeHandle className="se" />
                      <ResizeHandle className="sw" />
                      <ResizeHandle className="ne" />
                      <ResizeHandle className="nw" />
                      <ResizeHandle className="e" />
                      <ResizeHandle className="w" />
                      <ResizeHandle className="n" />
                      <ResizeHandle className="s" />
                    </>
                  )}
                  grid={showGrid ? [20, 20] : null}
                >
                  <div style={{ width: '100%', height: '100%' }}>
                    <ShapeElement 
                      width="100%"
                      height="100%"
                      backgroundColor={element.backgroundColor} 
                      borderColor={element.borderColor} 
                      borderWidth={element.borderWidth} 
                      shapeType={element.shapeType} 
                    />
                  </div>
                </Resizable>
              ) : (
                <ShapeElement 
                  width={element.width || 100} 
                  height={element.height || 100} 
                  backgroundColor={element.backgroundColor} 
                  borderColor={element.borderColor} 
                  borderWidth={element.borderWidth} 
                  shapeType={element.shapeType} 
                />
              )}
            </>
          )}
          {type === 'shape' && element.shapeType === 'line' && (
            <>
              {isSelected ? (
                <Resizable
                  width={element.width || 100}
                  height={element.borderWidth || 1}
                  onResize={(e, data) => handleResize(id, e, data)}
                  resizeHandles={['e', 'w']}
                  handle={(
                    <>
                      <ResizeHandle className="e" style={{ top: '50%', right: '-5px', transform: 'translateY(-50%)' }} />
                      <ResizeHandle className="w" style={{ top: '50%', left: '-5px', transform: 'translateY(-50%)' }} />
                    </>
                  )}
                  grid={showGrid ? [20, 20] : null}
                >
                  <LineElement 
                    width="100%"
                    borderWidth={element.borderWidth} 
                    borderColor={element.borderColor} 
                    angle={element.angle} 
                  />
                </Resizable>
              ) : (
                <LineElement 
                  width={element.width || 100} 
                  borderWidth={element.borderWidth} 
                  borderColor={element.borderColor} 
                  angle={element.angle} 
                />
              )}
            </>
          )}
        </Element>
      </Draggable>
    )
  }

  return (
    <BoardContainer
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
      <Board 
        id="tide-board" 
        ref={boardRef}
        onClick={handleBoardClick}
        onContextMenu={handleContextMenu}
        background={boardBackground}
        width={canvasSize.width}
        height={canvasSize.height}
        showGrid={showGrid}
      >
        {elements.map(renderElement)}
        {isDrawing && drawingShape && (
          <ShapeElement
            style={{
              position: 'absolute',
              left: drawingShape.position.x,
              top: drawingShape.position.y,
              pointerEvents: 'none',
              zIndex: drawingShape.zIndex,
            }}
            width={drawingShape.width}
            height={drawingShape.height}
            backgroundColor={drawingShape.backgroundColor}
            borderColor={drawingShape.borderColor}
            borderWidth={drawingShape.borderWidth}
            shapeType={drawingShape.shapeType}
          />
        )}
      </Board>
      
      <GridToggle onClick={() => setShowGrid(!showGrid)} title="Toggle Grid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="3" y1="15" x2="21" y2="15"></line>
          <line x1="9" y1="3" x2="9" y2="21"></line>
          <line x1="15" y1="3" x2="15" y2="21"></line>
        </svg>
        {showGrid ? 'Hide Grid' : 'Show Grid'}
      </GridToggle>
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAddText={handleAddText}
          onAddImage={handleAddImage}
          onAddShape={handleAddShape}
          onDeleteElement={handleDeleteElement}
          forElement={!!contextMenu.elementId}
        />
      )}
    </BoardContainer>
  )
}

export default MoodBoard