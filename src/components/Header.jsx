import React, { useState } from 'react'
import styled from '@emotion/styled'
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import { useNavigate } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'

const HeaderContainer = styled.header`
  background-color: var(--surface-color);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
  z-index: 100;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const CanvasSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 2rem;
`

const CanvasTab = styled.button`
  background-color: ${props => props.isActive ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.isActive ? 'var(--primary-color)' : '#ddd'};
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--primary-color)' : 'rgba(98, 0, 234, 0.05)'};
    border-color: ${props => props.isActive ? 'var(--primary-color)' : 'var(--primary-color)'};
  }
`

const AddCanvasButton = styled.button`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px dashed var(--primary-color);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(98, 0, 234, 0.05);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`

const BackButton = styled.button`
  background-color: transparent;
  color: var(--primary-color);
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(98, 0, 234, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.3);
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 24px;
    height: 24px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    background-color: #7c4dff;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.3);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const ExportDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 180px;
  z-index: 1000;
  overflow: hidden;
`

const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(98, 0, 234, 0.05);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

function Header({ elements, boardBackground, canvases, activeCanvasId, switchCanvas, addCanvas, removeCanvas }) {
  const navigate = useNavigate()
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [canvasToDelete, setCanvasToDelete] = useState(null)
  
  const exportAsPng = () => {
    const boardElement = document.getElementById('tide-board')
    if (!boardElement) return
    
    toPng(boardElement, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `tide-board-${new Date().toISOString().slice(0, 10)}.png`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('Error exporting tide board:', err)
      })
  }
  
  const exportAsJpeg = () => {
    const boardElement = document.getElementById('tide-board')
    if (!boardElement) return
    
    toJpeg(boardElement, { cacheBust: true, quality: 0.95 })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = `tide-board-${new Date().toISOString().slice(0, 10)}.jpeg`
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.error('Error exporting tide board as JPEG:', err)
      })
  }
  
  const exportAsSvg = () => {
    const boardElement = document.getElementById('tide-board')
    if (!boardElement) return
    
    toSvg(boardElement, { cacheBust: true })
      .then((dataUrl) => {
        saveAs(dataUrl, `tide-board-${new Date().toISOString().slice(0, 10)}.svg`)
      })
      .catch((err) => {
        console.error('Error exporting tide board as SVG:', err)
      })
  }
  
  const exportAsPdf = () => {
    const boardElement = document.getElementById('tide-board')
    if (!boardElement) return
    
    toPng(boardElement, { cacheBust: true })
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: boardElement.offsetWidth > boardElement.offsetHeight ? 'landscape' : 'portrait',
          unit: 'px',
          format: [boardElement.offsetWidth, boardElement.offsetHeight]
        })
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, boardElement.offsetWidth, boardElement.offsetHeight)
        pdf.save(`tide-board-${new Date().toISOString().slice(0, 10)}.pdf`)
      })
      .catch((err) => {
        console.error('Error exporting tide board as PDF:', err)
      })
  }
  
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions)
  }
  
  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <HeaderContainer>
      <TitleContainer>
        <BackButton onClick={handleBackClick} title="Back to Home" aria-label="Back to Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </BackButton>
        <Title>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Tide Board
        </Title>
        
        {canvases && canvases.length > 0 && (
          <CanvasSelector>
            {canvases.map(canvas => (
              <CanvasTab 
                key={canvas.id} 
                isActive={canvas.id === activeCanvasId}
                onClick={() => switchCanvas(canvas.id)}
                title={canvas.name}
              >
                {canvas.name}
                {canvases.length > 1 && canvas.id === activeCanvasId && (
                  <span 
                    style={{ marginLeft: '4px', fontSize: '0.8rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCanvasToDelete(canvas);
                      setShowDeleteConfirm(true);
                    }}
                  >×</span>
                )}
              </CanvasTab>
            ))}
            <AddCanvasButton onClick={addCanvas} title="Add New Canvas">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </AddCanvasButton>
          </CanvasSelector>
        )}
      </TitleContainer>
      <ButtonGroup>
        <div style={{ position: 'relative' }}>
          <Button onClick={toggleExportOptions}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export
          </Button>
          {showExportOptions && (
            <ExportDropdown>
              <DropdownItem onClick={() => { exportAsPng(); setShowExportOptions(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                PNG Image
              </DropdownItem>
              <DropdownItem onClick={() => { exportAsJpeg(); setShowExportOptions(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                JPEG Image
              </DropdownItem>
              <DropdownItem onClick={() => { exportAsSvg(); setShowExportOptions(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                SVG Vector
              </DropdownItem>
              <DropdownItem onClick={() => { exportAsPdf(); setShowExportOptions(false); }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                PDF Document
              </DropdownItem>
            </ExportDropdown>
          )}
        </div>
      </ButtonGroup>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Canvas"
        message={canvasToDelete ? `Are you sure you want to remove "${canvasToDelete.name}"? This action cannot be undone.` : ''}
        onConfirm={() => {
          if (canvasToDelete) {
            removeCanvas(canvasToDelete.id);
            setCanvasToDelete(null);
            setShowDeleteConfirm(false);
          }
        }}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setCanvasToDelete(null);
        }}
      />
    </HeaderContainer>
  )
}

export default Header