import React, { useState } from 'react'
import styled from '@emotion/styled'

const ToolbarContainer = styled.div`
  width: 320px;
  background-color: var(--surface-color);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: -1px 0 5px rgba(0, 0, 0, 0.03);
  transition: background-color 0.3s ease;
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  &:last-of-type {
    border-bottom: none;
  }
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
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`

const Input = styled.input`
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 100%;
  transition: all 0.2s ease;
  background-color: ${props => props.type === 'file' ? 'transparent' : 'white'};
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const TextArea = styled.textarea`
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 100%;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const ColorPickerContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`

const ColorPicker = styled.input`
  width: 100%;
  height: 40px;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #bbb;
    transform: scale(1.01);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`

const HexInput = styled.input`
  width: 90px;
  height: 40px;
  padding: 0 0.5rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: monospace;
  text-transform: uppercase;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const Label = styled.label`
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    width: 14px;
    height: 14px;
    color: var(--text-secondary);
  }
`

const Select = styled.select`
  padding: 0.65rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 100%;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.1);
  }
`

const ElementControls = styled.div`
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  margin-top: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
`

function Toolbar({ 
  addElement, 
  selectedElement, 
  updateElement, 
  deleteElement, 
  setBoardBackground, 
  boardBackground,
  bringToFront,
  sendToBack,
  canvasSize,
  setCanvasSize,
  drawingMode,
  setDrawingMode,
  shapeColor,
  setShapeColor,
  shapeBorderColor,
  setShapeBorderColor,
  shapeBorderWidth,
  setShapeBorderWidth
}) {
  const [imageUrl, setImageUrl] = useState('')
  // No longer need textContent state since we'll use default text
  // const [textContent, setTextContent] = useState('')
  const [textFontFamily, setTextFontFamily] = useState('Arial')
  const [textFontSize, setTextFontSize] = useState('16px')
  const [textFontStyle, setTextFontStyle] = useState('normal')
  const [textFontWeight, setTextFontWeight] = useState('normal')
  const [colorValue, setColorValue] = useState('#6200ea')
  const [shapeType, setShapeType] = useState('rectangle')
  
  const handleAddImage = () => {
    if (imageUrl.trim()) {
      // Basic URL validation
      try {
        new URL(imageUrl);
        
        // Create a temporary image to check if the URL is valid
        const tempImg = new Image();
        tempImg.onload = () => {
          // Image loaded successfully, add it to the board
          addElement({
            type: 'image',
            src: imageUrl,
            alt: 'Tide board image',
            isLoading: false,
            error: false
          });
          setImageUrl('');
        };
        
        tempImg.onerror = () => {
          // Image failed to load
          alert('Failed to load image. Please check the URL and try again.');
        };
        
        // Set the source to trigger loading
        tempImg.src = imageUrl;
      } catch (e) {
        alert('Please enter a valid image URL');
      }
    }
  }
  
  const handleAddText = () => {
    // Add a default text element that can be edited directly on the canvas
    addElement({
      type: 'text',
      content: 'Double-click to edit text',
      fontFamily: textFontFamily,
      fontSize: textFontSize,
      fontWeight: textFontWeight,
      fontStyle: textFontStyle,
      letterSpacing: 'normal',
      color: '#000000',
      backgroundColor: 'transparent',
      textAlign: 'left'
    })
  }
  
  const handleAddColor = () => {
    addElement({
      type: 'color',
      color: colorValue
    })
  }
  
  const handleAddShape = (shape) => {
    setDrawingMode(shape);
  };
  
  const handleUpdateElement = (property, value) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { [property]: value })
    }
  }
  
  return (
    <ToolbarContainer>
      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Board Background
        </SectionTitle>
        <FormGroup>
          <Label>Background Color</Label>
          <ColorPickerContainer>
            <ColorPicker 
              type="color" 
              value={boardBackground} 
              onChange={(e) => setBoardBackground(e.target.value)} 
            />
            <HexInput 
              type="text" 
              value={boardBackground} 
              onChange={(e) => {
                const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                  setBoardBackground(value);
                }
              }} 
              placeholder="#RRGGBB"
              maxLength={7}
            />
          </ColorPickerContainer>
        </FormGroup>
      </Section>
      
      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 6H3"></path>
            <path d="M21 12H3"></path>
            <path d="M21 18H3"></path>
          </svg>
          Canvas Size
        </SectionTitle>
        <FormGroup>
          <Label>Preset Sizes</Label>
          <Select
            value="custom"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "small") {
                setCanvasSize({ width: 600, height: 400 });
              } else if (value === "medium") {
                setCanvasSize({ width: 800, height: 600 });
              } else if (value === "large") {
                setCanvasSize({ width: 1200, height: 800 });
              } else if (value === "square") {
                setCanvasSize({ width: 800, height: 800 });
              } else if (value === "widescreen") {
                setCanvasSize({ width: 1280, height: 720 });
              }
            }}
          >
            <option value="custom">Custom</option>
            <option value="small">Small (600 × 400)</option>
            <option value="medium">Medium (800 × 600)</option>
            <option value="large">Large (1200 × 800)</option>
            <option value="square">Square (800 × 800)</option>
            <option value="widescreen">Widescreen (1280 × 720)</option>
          </Select>
        </FormGroup>
        <FormGroup style={{ marginBottom: '0.5rem' }}>
          <Label>Dimensions (px)</Label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span style={{ fontSize: '0.8rem', marginRight: '0.25rem', color: 'var(--text-secondary)' }}>W:</span>
              <Input 
                type="number" 
                value={canvasSize.width} 
                onChange={(e) => {
                  const width = parseInt(e.target.value, 10) || 800;
                  setCanvasSize({ ...canvasSize, width: Math.max(300, Math.min(2000, width)) });
                }} 
                min="300"
                max="2000"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <span style={{ fontSize: '0.8rem', marginRight: '0.25rem', color: 'var(--text-secondary)' }}>H:</span>
              <Input 
                type="number" 
                value={canvasSize.height} 
                onChange={(e) => {
                  const height = parseInt(e.target.value, 10) || 600;
                  setCanvasSize({ ...canvasSize, height: Math.max(300, Math.min(2000, height)) });
                }} 
                min="300"
                max="2000"
              />
            </div>
          </div>
        </FormGroup>
      </Section>
      

      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Add Image
        </SectionTitle>
        <FormGroup>
          <Label>Image URL</Label>
          <Input 
            type="text" 
            placeholder="https://example.com/image.jpg" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Or Upload Image</Label>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  // Add the image to the board when file is loaded
                  addElement({
                    type: 'image',
                    src: event.target.result,
                    alt: 'Uploaded tide board image',
                    isLoading: false,
                    error: false
                  });
                };
                reader.readAsDataURL(e.target.files[0]);
                // Reset the file input
                e.target.value = '';
              }
            }}
            style={{ 
              padding: '0.4rem',
              cursor: 'pointer' 
            }}
          />
        </FormGroup>
        <Button onClick={handleAddImage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          Add Image from URL
        </Button>
      </Section>

      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          Add Shape
        </SectionTitle>
        <ButtonGroup>
          <Button onClick={() => handleAddShape('rectangle')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
          </Button>
          <Button onClick={() => handleAddShape('circle')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
          </Button>
        </ButtonGroup>

      </Section>
      
      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          Add Text
        </SectionTitle>
        {/* Text content box removed - text can be edited directly on canvas */}
        <FormGroup>
          <Label>Font Family</Label>
          <Select 
            value={textFontFamily} 
            onChange={(e) => setTextFontFamily(e.target.value)}
          >
            {/* Web Safe Fonts */}
            <optgroup label="Web Safe Fonts">
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
            </optgroup>
            {/* Google Fonts */}
            <optgroup label="Google Fonts">
              <option value="Roboto">Roboto</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Lato">Lato</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Poppins">Poppins</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Raleway">Raleway</option>
            </optgroup>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Font Size</Label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Select 
              value={textFontSize} 
              onChange={(e) => setTextFontSize(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="10px">10px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
              <option value="42px">42px</option>
              <option value="48px">48px</option>
            </Select>
            <Input 
              type="number" 
              placeholder="Custom" 
              onChange={(e) => {
                const size = parseInt(e.target.value, 10);
                if (size > 0) {
                  setTextFontSize(`${size}px`);
                }
              }}
              style={{ width: '80px' }}
              min="8"
              max="144"
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label>Font Style</Label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div 
              onClick={() => setTextFontStyle('normal')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontStyle === 'normal' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontStyle === 'normal' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontWeight: 'normal',
                fontSize: '14px'
              }}
              title="Normal"
            >
              Aa
            </div>
            <div 
              onClick={() => setTextFontStyle('italic')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontStyle === 'italic' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontStyle === 'italic' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontStyle: 'italic',
                fontSize: '14px'
              }}
              title="Italic"
            >
              Aa
            </div>
            <div 
              onClick={() => setTextFontStyle('oblique')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontStyle === 'oblique' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontStyle === 'oblique' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontStyle: 'oblique',
                fontSize: '14px'
              }}
              title="Oblique"
            >
              Aa
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <Label>Font Weight</Label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div 
              onClick={() => setTextFontWeight('normal')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontWeight === 'normal' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontWeight === 'normal' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontWeight: 'normal',
                fontSize: '14px'
              }}
              title="Normal"
            >
              Aa
            </div>
            <div 
              onClick={() => setTextFontWeight('bold')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontWeight === 'bold' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontWeight === 'bold' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
              title="Bold"
            >
              Aa
            </div>
            <div 
              onClick={() => setTextFontWeight('lighter')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontWeight === 'lighter' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontWeight === 'lighter' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontWeight: 'lighter',
                fontSize: '14px'
              }}
              title="Lighter"
            >
              Aa
            </div>
            <div 
              onClick={() => setTextFontWeight('500')} 
              style={{ 
                width: '40px', 
                height: '40px', 
                border: `2px solid ${textFontWeight === '500' ? 'var(--primary-color)' : '#ddd'}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: textFontWeight === '500' ? 'rgba(98, 0, 234, 0.1)' : 'white',
                fontWeight: '500',
                fontSize: '14px'
              }}
              title="Medium (500)"
            >
              Aa
            </div>
          </div>
        </FormGroup>
        <Button onClick={handleAddText}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
          Add Text
        </Button>
      </Section>

    </ToolbarContainer>
  );
} // End of Toolbar component

export default Toolbar;