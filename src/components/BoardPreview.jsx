import React from 'react'
import styled from '@emotion/styled'

const PreviewContainer = styled.div`
  background-color: ${props => props.background || '#ffffff'};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
`

const PreviewElement = styled.div`
  position: absolute;
  transform: scale(0.25);
  transform-origin: top left;
  pointer-events: none;
`

const PreviewImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
`

const PreviewText = styled.div`
  padding: 2px;
  font-family: ${props => props.fontFamily || 'inherit'};
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || '#000000'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  text-align: ${props => props.textAlign || 'left'};
`

const PreviewShape = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
  border: ${props => (props.borderWidth > 0) ? `${props.borderWidth}px solid ${props.borderColor}` : 'none'};
  border-radius: ${props => props.shapeType === 'circle' ? '50%' : props.shapeType === 'rectangle' ? '4px' : '0'};
`

const PreviewLine = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.borderWidth}px;
  background-color: ${props => props.borderColor};
  transform: ${props => props.angle ? `rotate(${props.angle}deg)` : 'none'};
  transform-origin: center;
`

const PreviewColor = styled.div`
  width: 25px;
  height: 25px;
  background-color: ${props => props.color};
  border-radius: 4px;
`

const EmptyPreview = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 0.9rem;
`

function BoardPreview({ board }) {
  // If no board or no canvases, show empty preview
  if (!board || !board.canvases || board.canvases.length === 0) {
    return <EmptyPreview>No content</EmptyPreview>
  }
  
  // Get the first canvas (active or first one)
  const canvas = board.canvases.find(c => c.isActive) || board.canvases[0]
  const { elements, background } = canvas
  
  // If no elements, show empty preview
  if (!elements || elements.length === 0) {
    return <EmptyPreview>Empty board</EmptyPreview>
  }
  
  // Render a maximum of 5 elements for the preview
  const previewElements = elements.slice(0, 5).map(element => {
    const { id, type, position } = element
    
    const elementStyle = {
      left: `${position.x * 0.25}px`,
      top: `${position.y * 0.25}px`,
    }
    
    return (
      <PreviewElement key={id} style={elementStyle}>
        {type === 'image' && (
          <PreviewImage 
            src={element.src} 
            alt=""
            width={element.width ? element.width * 0.25 : 50}
            height={element.height ? element.height * 0.25 : 37.5}
          />
        )}
        {type === 'text' && (
          <PreviewText
            fontFamily={element.fontFamily}
            fontSize={`${parseInt(element.fontSize) * 0.25}px`}
            fontWeight={element.fontWeight}
            color={element.color}
            backgroundColor={element.backgroundColor}
            textAlign={element.textAlign}
          >
            {element.content}
          </PreviewText>
        )}
        {type === 'color' && (
          <PreviewColor color={element.color} />
        )}
        {type === 'shape' && element.shapeType !== 'line' && (
          <PreviewShape 
            width={element.width * 0.25 || 25} 
            height={element.height * 0.25 || 25} 
            backgroundColor={element.backgroundColor} 
            borderColor={element.borderColor} 
            borderWidth={element.borderWidth * 0.25} 
            shapeType={element.shapeType} 
          />
        )}
        {type === 'shape' && element.shapeType === 'line' && (
          <PreviewLine 
            width={element.width * 0.25 || 25} 
            borderWidth={element.borderWidth * 0.25 || 0.25} 
            borderColor={element.borderColor} 
            angle={element.angle} 
          />
        )}
      </PreviewElement>
    )
  })
  
  return (
    <PreviewContainer background={background}>
      {previewElements}
    </PreviewContainer>
  )
}

export default BoardPreview