import React, { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { createBrowserRouter, RouterProvider, Outlet, useParams, useNavigate } from 'react-router-dom'
import MoodBoard from './components/MoodBoard'
import Toolbar from './components/Toolbar'
import Header from './components/Header'
import HomePage from './components/HomePage'
import NewBoardModal from './components/NewBoardModal'
import ElementProperties from './components/ElementProperties'
import LayersPanel from './components/LayersPanel'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const MainContent = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: row;
  height: calc(100vh - 60px); /* Adjust based on header height */
`

function App() {
  const [boards, setBoards] = useState(() => {
    const savedBoards = localStorage.getItem('tideBoards')
    return savedBoards ? JSON.parse(savedBoards) : []
  })

  // Import useRef at the top of the file
  // The debounced localStorage save function is now handling this

  // Debounced localStorage save function to prevent frequent writes
  const debouncedSaveToLocalStorage = useRef(null);
  
  // Function to save boards to localStorage with debouncing
  const saveToLocalStorage = (boardsToSave) => {
    // Clear any pending save operation
    if (debouncedSaveToLocalStorage.current) {
      clearTimeout(debouncedSaveToLocalStorage.current);
    }
    
    // Set a new timeout to save after a short delay
    debouncedSaveToLocalStorage.current = setTimeout(() => {
      localStorage.setItem('tideBoards', JSON.stringify(boardsToSave));
      debouncedSaveToLocalStorage.current = null;
    }, 100); // 100ms delay
  };
  
  // Modified useEffect to use the debounced save function
  useEffect(() => {
    saveToLocalStorage(boards);
    
    // Cleanup on unmount
    return () => {
      if (debouncedSaveToLocalStorage.current) {
        clearTimeout(debouncedSaveToLocalStorage.current);
        // Save immediately on unmount if there's a pending save
        localStorage.setItem('tideBoards', JSON.stringify(boards));
      }
    };
  }, [boards]);

  const createBoard = (name = 'Untitled Board', canvasSize = { width: 800, height: 600 }, background = '#ffffff', elements = []) => {
    const newBoard = {
      id: `board-${Date.now()}`,
      name,
      canvases: [
        {
          id: `canvas-${Date.now()}`,
          name: 'Canvas 1',
          elements: elements,
          background: background,
          canvasSize,
          isActive: true
        }
      ],
      createdAt: new Date().toISOString()
    }
    
    // Use functional update to ensure we're working with the latest state
    setBoards(prevBoards => [...prevBoards, newBoard])
    return newBoard.id
  }

  const updateBoard = (boardId, updates) => {
    setBoards(prevBoards => prevBoards.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    ))
  }

  const deleteBoard = (boardId) => {
    setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId))
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage boards={boards} deleteBoard={deleteBoard} />
    },
    {
      path: '/board/new',
      element: <NewBoardRedirect createBoard={createBoard} />
    },
    {
      path: '/board/:boardId',
      element: <BoardEditor boards={boards} updateBoard={updateBoard} />
    }
  ])

  return <RouterProvider router={router} />
}

// Component to handle new board creation with modal
function NewBoardRedirect({ createBoard }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(true)
  
  const handleCreateBoard = (name, canvasSize) => {
    const newBoardId = createBoard(name, canvasSize)
    // Use replace option to ensure clean transition without page refresh
    navigate(`/board/${newBoardId}`, { replace: true })
  }
  
  const handleCloseModal = () => {
    // If user closes modal without creating a board, go back to home
    navigate('/')
  }
  
  return (
    <NewBoardModal 
      isOpen={showModal} 
      onClose={handleCloseModal} 
      onCreateBoard={handleCreateBoard} 
    />
  )
}

// Component for editing a specific board
function BoardEditor({ boards, updateBoard }) {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const board = boards.find(b => b.id === boardId)
  
  const [canvases, setCanvases] = useState(() => board?.canvases || [
    {
      id: `canvas-${Date.now()}`,
      name: 'Canvas 1',
      elements: [],
      background: '#ffffff',
      canvasSize: { width: 800, height: 600 },
      isActive: true
    }
  ])
  const [activeCanvasId, setActiveCanvasId] = useState(() => {
    const activeCanvas = board?.canvases?.find(c => c.isActive) || board?.canvases?.[0]
    return activeCanvas?.id || canvases[0].id
  })
  const [selectedElement, setSelectedElement] = useState(null)
  const [drawingMode, setDrawingMode] = useState(null);
  const [shapeColor, setShapeColor] = useState('#6200ea');
  const [shapeBorderColor, setShapeBorderColor] = useState('#000000');
  const [shapeBorderWidth, setShapeBorderWidth] = useState(1);
  
  // Get the active canvas
  const activeCanvas = canvases.find(c => c.id === activeCanvasId) || canvases[0]
  
  // Extract active canvas properties for easier access
  const elements = activeCanvas.elements
  const boardBackground = activeCanvas.background
  const canvasSize = activeCanvas.canvasSize
  
  // Function to update the active canvas
  const updateActiveCanvas = (updates) => {
    setCanvases(canvases.map(canvas => 
      canvas.id === activeCanvasId ? { ...canvas, ...updates } : canvas
    ))
  }
  
  // Function to add a new canvas
  const addCanvas = () => {
    const newCanvas = {
      id: `canvas-${Date.now()}`,
      name: `Canvas ${canvases.length + 1}`,
      elements: [],
      background: '#ffffff',
      canvasSize: { width: 800, height: 600 },
      isActive: false
    }
    
    // Set all canvases to inactive and the new one to active
    const updatedCanvases = canvases.map(canvas => ({ ...canvas, isActive: false }))
    updatedCanvases.push({ ...newCanvas, isActive: true })
    
    setCanvases(updatedCanvases)
    setActiveCanvasId(newCanvas.id)
    setSelectedElement(null)
  }
  
  // Function to remove a canvas
  const removeCanvas = (canvasId) => {
    if (canvases.length <= 1) {
      alert('You cannot remove the only canvas')
      return
    }
    
    const updatedCanvases = canvases.filter(canvas => canvas.id !== canvasId)
    
    // If the active canvas was removed, set the first canvas as active
    if (canvasId === activeCanvasId) {
      updatedCanvases[0].isActive = true
      setActiveCanvasId(updatedCanvases[0].id)
    }
    
    setCanvases(updatedCanvases)
    setSelectedElement(null)
  }
  
  // Function to switch to a different canvas
  const switchCanvas = (canvasId) => {
    setCanvases(canvases.map(canvas => 
      ({ ...canvas, isActive: canvas.id === canvasId })
    ))
    setActiveCanvasId(canvasId)
    setSelectedElement(null)
  }
  
  // Update the board in the parent state when canvases change
  useEffect(() => {
    if (board) {
      updateBoard(boardId, {
        canvases
      })
    }
  }, [canvases, boardId, updateBoard])

  // If board doesn't exist, redirect to home
  if (!board) {
    navigate('/')
    return null
  }

  const addElement = (element) => {
    const newElement = {
      ...element,
      id: `element-${Date.now()}`,
      position: element.position || { x: 50, y: 50 },
      zIndex: elements.length
    }

    if (element.type === 'image' && (!element.width || !element.height)) {
      newElement.width = 200;
      newElement.height = 150;
    }

    if (element.type === 'shape' && drawingMode) {
      newElement.width = element.width;
      newElement.height = element.height;
    }
    
    // Update the active canvas with the new element
    updateActiveCanvas({
      elements: [...elements, newElement]
    })
  }

  const updateElement = (id, updates) => {
    updateActiveCanvas({
      elements: elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    })
  }

  const deleteElement = (id) => {
    updateActiveCanvas({
      elements: elements.filter(el => el.id !== id)
    })
    
    if (selectedElement?.id === id) {
      setSelectedElement(null)
    }
  }

  const selectElement = (id) => {
    const element = elements.find(el => el.id === id)
    setSelectedElement(element)
  }

  const bringToFront = (id) => {
    const newElements = [...elements]
    const index = newElements.findIndex(el => el.id === id)
    if (index !== -1) {
      const [element] = newElements.splice(index, 1)
      newElements.forEach(el => {
        if (el.zIndex > element.zIndex) {
          el.zIndex--
        }
      })
      element.zIndex = newElements.length
      newElements.push(element)
      
      updateActiveCanvas({
        elements: newElements
      })
    }
  }

  const sendToBack = (id) => {
    const newElements = [...elements]
    const index = newElements.findIndex(el => el.id === id)
    if (index !== -1) {
      const [element] = newElements.splice(index, 1)
      newElements.forEach(el => {
        if (el.zIndex < element.zIndex) {
          el.zIndex++
        }
      })
      element.zIndex = 0
      newElements.unshift(element)
      
      updateActiveCanvas({
        elements: newElements
      })
    }
  }
  
  const setBoardBackground = (color) => {
    updateActiveCanvas({
      background: color
    })
  }
  
  const setCanvasSize = (size) => {
    updateActiveCanvas({
      canvasSize: size
    })
  }

  return (
    <AppContainer>
      <Header 
        elements={elements} 
        boardBackground={boardBackground}
        canvases={canvases}
        activeCanvasId={activeCanvasId}
        switchCanvas={switchCanvas}
        addCanvas={addCanvas}
        removeCanvas={removeCanvas}
      />
      <MainContent>
        <Toolbar 
            drawingMode={drawingMode}
            setDrawingMode={setDrawingMode}
          addElement={addElement} 
          selectedElement={selectedElement}
          updateElement={updateElement}
          deleteElement={deleteElement}
          setBoardBackground={setBoardBackground}
          boardBackground={boardBackground}
          bringToFront={bringToFront}
          sendToBack={sendToBack}
          canvasSize={canvasSize}
          setCanvasSize={setCanvasSize}
          canvases={canvases}
          activeCanvasId={activeCanvasId}
          switchCanvas={switchCanvas}
          addCanvas={addCanvas}
          removeCanvas={removeCanvas}
          elements={elements}
          selectElement={selectElement}
          shapeColor={shapeColor}
          setShapeColor={setShapeColor}
          shapeBorderColor={shapeBorderColor}
          setShapeBorderColor={setShapeBorderColor}
          shapeBorderWidth={shapeBorderWidth}
          setShapeBorderWidth={setShapeBorderWidth}
        />
        <MoodBoard 
            drawingMode={drawingMode}
            setDrawingMode={setDrawingMode}
          elements={elements}
          updateElement={updateElement}
          selectElement={selectElement}
          selectedElement={selectedElement}
          boardBackground={boardBackground}
          canvasSize={canvasSize}
          activeCanvas={activeCanvas}
          addElement={addElement}
          deleteElement={deleteElement}
          shapeColor={shapeColor}
          shapeBorderColor={shapeBorderColor}
          shapeBorderWidth={shapeBorderWidth}
        />
        <div style={{ display: 'flex', flexDirection: 'column', width: '320px', backgroundColor: 'white' }}>
          {selectedElement && (
            <ElementProperties 
              selectedElement={selectedElement}
              updateElement={updateElement}
              deleteElement={deleteElement}
              bringToFront={bringToFront}
              sendToBack={sendToBack}
            />
          )}
          <div style={{ padding: '1.25rem 1.25rem 0' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '1rem' 
            }}>
              <h2 style={{ 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: 'var(--text-primary)', 
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                Canvases ({canvases.length})
              </h2>
              <button 
                onClick={addCanvas} 
                title="Add New Canvas"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--primary-color)',
                  border: '1px dashed var(--primary-color)',
                  borderRadius: '4px',
                  padding: '0.4rem 0.6rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(98, 0, 234, 0.05)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
            <LayersPanel 
              elements={elements} 
              selectedElement={selectedElement} 
              selectElement={selectElement} 
              bringToFront={bringToFront} 
              sendToBack={sendToBack}
              deleteElement={deleteElement} 
            />
          </div>
        </div>
      </MainContent>
    </AppContainer>
  )
}

export default App