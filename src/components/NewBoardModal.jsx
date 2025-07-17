import React, { useState } from 'react'
import styled from '@emotion/styled'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  color: var(--text-secondary);
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:focus {
    outline: none;
  }
`

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #ddd;
  color: var(--text-secondary);
  
  &:hover {
    background-color: #f5f5f5;
  }
`

const CreateButton = styled(Button)`
  background-color: var(--primary-color);
  border: none;
  color: white;
  
  &:hover {
    background-color: #7c4dff;
  }
`

const CustomSizeContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`



function NewBoardModal({ isOpen, onClose, onCreateBoard }) {
  const [boardName, setBoardName] = useState('Untitled Board')
  const [sizeOption, setSizeOption] = useState('medium')
  const [customWidth, setCustomWidth] = useState(800)
  const [customHeight, setCustomHeight] = useState(600)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Use custom settings
    let canvasSize = { width: 800, height: 600 } // Default medium size
    
    // Set canvas size based on selection
    switch (sizeOption) {
      case 'small':
        canvasSize = { width: 600, height: 400 }
        break
      case 'medium':
        canvasSize = { width: 800, height: 600 }
        break
      case 'large':
        canvasSize = { width: 1200, height: 800 }
        break
      case 'square':
        canvasSize = { width: 800, height: 800 }
        break
      case 'widescreen':
        canvasSize = { width: 1280, height: 720 }
        break
      case 'custom':
        canvasSize = {
          width: Math.max(300, Math.min(2000, customWidth)),
          height: Math.max(300, Math.min(2000, customHeight))
        }
        break
      default:
        break
    }
    
    onCreateBoard(boardName, canvasSize)
    onClose()
  }
  
  if (!isOpen) return null
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Create New Board</ModalTitle>
        </ModalHeader>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="board-name">Board Name</Label>
            <Input
              id="board-name"
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              autoFocus
            />
          </FormGroup>
          
          <FormGroup>
              <Label htmlFor="canvas-size">Canvas Size</Label>
              <Select
                id="canvas-size"
                value={sizeOption}
                onChange={(e) => setSizeOption(e.target.value)}
              >
                <option value="small">Small (600 × 400)</option>
                <option value="medium">Medium (800 × 600)</option>
                <option value="large">Large (1200 × 800)</option>
                <option value="square">Square (800 × 800)</option>
                <option value="widescreen">Widescreen (1280 × 720)</option>
                <option value="custom">Custom</option>
              </Select>
              
              {sizeOption === 'custom' && (
                <CustomSizeContainer>
                  <FormGroup>
                    <Label htmlFor="custom-width">Width (px)</Label>
                    <Input
                      id="custom-width"
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(parseInt(e.target.value, 10) || 800)}
                      min="300"
                      max="2000"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="custom-height">Height (px)</Label>
                    <Input
                      id="custom-height"
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(parseInt(e.target.value, 10) || 600)}
                      min="300"
                      max="2000"
                    />
                  </FormGroup>
                </CustomSizeContainer>
    
              )}
            </FormGroup>

          
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <CreateButton type="submit">
              Create Board
            </CreateButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default NewBoardModal