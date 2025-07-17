import React, { useState } from 'react'
import styled from '@emotion/styled'
import ConfirmDialog from './ConfirmDialog'

const LayersPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
  background-color: white;
  padding-top: 0.75rem;
`

const LayerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${props => props.isSelected ? 'rgba(98, 0, 234, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.isSelected ? 'var(--primary-color)' : 'rgba(0, 0, 0, 0.05)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isSelected ? 'rgba(98, 0, 234, 0.1)' : 'rgba(0, 0, 0, 0.02)'};
  }
`

const LayerIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: var(--text-secondary);
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const LayerName = styled.div`
  flex: 1;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-primary);
`

const LayerControls = styled.div`
  display: flex;
  gap: 0.25rem;
`

const LayerButton = styled.button`
  background: transparent;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--primary-color);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`

const EmptyLayersMessage = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-style: italic;
`

const SectionTitle = styled.h2`
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
  }
`

function LayersPanel({ elements, selectedElement, selectElement, bringToFront, sendToBack, deleteElement }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [elementToDelete, setElementToDelete] = useState(null)
  // Sort elements by z-index in descending order (highest z-index first)
  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex)
  
  const getLayerName = (element) => {
    switch (element.type) {
      case 'text':
        return `Text: ${element.content.substring(0, 15)}${element.content.length > 15 ? '...' : ''}`
      case 'image':
        return 'Image'
      case 'color':
        return `Color: ${element.color}`
      case 'shape':
        return `Shape: ${element.shapeType}`
      default:
        return `Element ${element.id}`
    }
  }
  
  const getLayerIcon = (element) => {
    switch (element.type) {
      case 'text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        )
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        )
      case 'color':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
          </svg>
        )
      case 'shape':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        )
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        )
    }
  }
  
  const handleConfirmDelete = () => {
    if (elementToDelete) {
      deleteElement(elementToDelete)
      setElementToDelete(null)
      setShowDeleteConfirm(false)
    }
  }

  const handleCancelDelete = () => {
    setElementToDelete(null)
    setShowDeleteConfirm(false)
  }

  return (
    <LayersPanelContainer>
      <SectionTitle>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        Layers
      </SectionTitle>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Element"
        message="Are you sure you want to delete this element? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      {sortedElements.length > 0 ? (
        sortedElements.map(element => (
          <LayerItem 
            key={element.id} 
            isSelected={selectedElement?.id === element.id}
            onClick={() => selectElement(element.id)}
          >
            <LayerIcon>
              {getLayerIcon(element)}
            </LayerIcon>
            <LayerName>
              {getLayerName(element)}
            </LayerName>
            <LayerControls>
              <LayerButton 
                title="Bring to Front" 
                onClick={(e) => {
                  e.stopPropagation()
                  bringToFront(element.id)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 11 12 6 7 11"></polyline>
                  <polyline points="17 18 12 13 7 18"></polyline>
                </svg>
              </LayerButton>
              <LayerButton 
                title="Send to Back" 
                onClick={(e) => {
                  e.stopPropagation()
                  sendToBack(element.id)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 13 12 18 17 13"></polyline>
                  <polyline points="7 6 12 11 17 6"></polyline>
                </svg>
              </LayerButton>
              <LayerButton 
                title="Delete Element" 
                onClick={(e) => {
                  e.stopPropagation()
                  setElementToDelete(element.id)
                  setShowDeleteConfirm(true)
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </LayerButton>
            </LayerControls>
          </LayerItem>
        ))
      ) : (
        <EmptyLayersMessage>
          No elements on the canvas yet.
        </EmptyLayersMessage>
      )}
    </LayersPanelContainer>
  )
}

export default LayersPanel