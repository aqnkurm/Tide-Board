import React from 'react'
import styled from '@emotion/styled'

const ElementPropertiesContainer = styled.div`
  width: 320px;
  background-color: var(--surface-color);
  padding: 1.25rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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

export const ElementControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: background-color 0.3s ease;
`

// Export other components needed by Toolbar.jsx
export { FormGroup, Label, TextArea, ColorPickerContainer, ColorPicker, HexInput, Select, Input }

function ElementProperties({ 
  selectedElement, 
  updateElement, 
  deleteElement,
  bringToFront,
  sendToBack
}) {
  const handleUpdateElement = (property, value) => {
    if (selectedElement) {
      updateElement(selectedElement.id, { [property]: value })
    }
  }
  
  if (!selectedElement) {
    return (
      <ElementPropertiesContainer>
        <Section>
          <SectionTitle>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Element Properties
          </SectionTitle>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem 0' }}>
            Select an element to view and edit its properties.
          </p>
        </Section>
      </ElementPropertiesContainer>
    )
  }

  return (
    <ElementPropertiesContainer>
      <Section>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Element Properties
        </SectionTitle>
        <ElementControls>
          {selectedElement.type === 'text' && (
            <>
              <FormGroup>
                <Label>Font Family</Label>
                <Select
                  value={selectedElement.fontFamily} 
                  onChange={(e) => handleUpdateElement('fontFamily', e.target.value)}
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
                    value={selectedElement.fontSize} 
                    onChange={(e) => handleUpdateElement('fontSize', e.target.value)}
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
                    <option value="56px">56px</option>
                    <option value="64px">64px</option>
                    <option value="72px">72px</option>
                  </Select>
                  <Input 
                    type="number" 
                    placeholder="Custom" 
                    onChange={(e) => {
                      const size = parseInt(e.target.value, 10);
                      if (size > 0) {
                        handleUpdateElement('fontSize', `${size}px`);
                      }
                    }}
                    style={{ width: '80px' }}
                    min="8"
                    max="144"
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label>Font Weight</Label>
                <Select 
                  value={selectedElement.fontWeight} 
                  onChange={(e) => handleUpdateElement('fontWeight', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Lighter</option>
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extra Bold (800)</option>
                  <option value="900">Black (900)</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Font Style</Label>
                <Select 
                  value={selectedElement.fontStyle || 'normal'} 
                  onChange={(e) => handleUpdateElement('fontStyle', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Letter Spacing</Label>
                <Select 
                  value={selectedElement.letterSpacing || 'normal'} 
                  onChange={(e) => handleUpdateElement('letterSpacing', e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="-0.05em">Tight</option>
                  <option value="0.05em">Spaced</option>
                  <option value="0.1em">Wide</option>
                  <option value="0.15em">Extra Wide</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Text Color</Label>
                <ColorPickerContainer>
                  <ColorPicker 
                    type="color" 
                    value={selectedElement.color} 
                    onChange={(e) => handleUpdateElement('color', e.target.value)} 
                  />
                  <HexInput 
                    type="text" 
                    value={selectedElement.color} 
                    onChange={(e) => {
                      const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                      if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                        handleUpdateElement('color', value);
                      }
                    }} 
                    placeholder="#RRGGBB"
                    maxLength={7}
                  />
                </ColorPickerContainer>
              </FormGroup>
              <FormGroup>
                <Label>Background Color</Label>
                <ColorPickerContainer>
                  <ColorPicker 
                    type="color" 
                    value={selectedElement.backgroundColor || '#ffffff'} 
                    onChange={(e) => handleUpdateElement('backgroundColor', e.target.value)} 
                  />
                  <HexInput 
                    type="text" 
                    value={selectedElement.backgroundColor || '#ffffff'} 
                    onChange={(e) => {
                      const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                      if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                        handleUpdateElement('backgroundColor', value);
                      }
                    }} 
                    placeholder="#RRGGBB"
                    maxLength={7}
                  />
                </ColorPickerContainer>
              </FormGroup>
              <FormGroup>
                <Label>Text Align</Label>
                <Select 
                  value={selectedElement.textAlign} 
                  onChange={(e) => handleUpdateElement('textAlign', e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </Select>
              </FormGroup>
            </>
          )}
          {selectedElement.type === 'image' && (
            <>
              <FormGroup>
                <Label>Width (px)</Label>
                <Input 
                  type="number" 
                  value={selectedElement.width || 200} 
                  onChange={(e) => handleUpdateElement('width', parseInt(e.target.value, 10) || 200)} 
                  min="50"
                  max="800"
                />
              </FormGroup>
              <FormGroup>
                <Label>Height (px)</Label>
                <Input 
                  type="number" 
                  value={selectedElement.height || 150} 
                  onChange={(e) => handleUpdateElement('height', parseInt(e.target.value, 10) || 150)} 
                  min="50"
                  max="600"
                />
              </FormGroup>
              <Button onClick={() => {
                const img = new Image();
                img.onload = () => {
                  const aspectRatio = img.width / img.height;
                  const newWidth = selectedElement.width || 200;
                  const newHeight = Math.round(newWidth / aspectRatio);
                  handleUpdateElement('height', newHeight);
                };
                img.src = selectedElement.src;
              }}>
                Reset Aspect Ratio
              </Button>
            </>
          )}
          {selectedElement.type === 'color' && (
            <FormGroup>
              <Label>Color</Label>
              <ColorPickerContainer>
                <ColorPicker 
                  type="color" 
                  value={selectedElement.color} 
                  onChange={(e) => handleUpdateElement('color', e.target.value)} 
                />
                <HexInput 
                  type="text" 
                  value={selectedElement.color} 
                  onChange={(e) => {
                    const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                      handleUpdateElement('color', value);
                    }
                  }} 
                  placeholder="#RRGGBB"
                  maxLength={7}
                />
              </ColorPickerContainer>
            </FormGroup>
          )}
          {selectedElement.type === 'shape' && (
            <>
              <FormGroup>
                <Label>Shape Type</Label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <div 
                    onClick={() => handleUpdateElement('shapeType', 'rectangle')} 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      border: `2px solid ${selectedElement.shapeType === 'rectangle' ? 'var(--primary-color)' : '#ddd'}`,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: selectedElement.shapeType === 'rectangle' ? 'rgba(98, 0, 234, 0.1)' : 'white'
                    }}
                    title="Rectangle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedElement.shapeType === 'rectangle' ? 'var(--primary-color)' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                  </div>
                  <div 
                    onClick={() => handleUpdateElement('shapeType', 'circle')} 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      border: `2px solid ${selectedElement.shapeType === 'circle' ? 'var(--primary-color)' : '#ddd'}`,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: selectedElement.shapeType === 'circle' ? 'rgba(98, 0, 234, 0.1)' : 'white'
                    }}
                    title="Circle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedElement.shapeType === 'circle' ? 'var(--primary-color)' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <div 
                    onClick={() => handleUpdateElement('shapeType', 'line')} 
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      border: `2px solid ${selectedElement.shapeType === 'line' ? 'var(--primary-color)' : '#ddd'}`,
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      backgroundColor: selectedElement.shapeType === 'line' ? 'rgba(98, 0, 234, 0.1)' : 'white'
                    }}
                    title="Line"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={selectedElement.shapeType === 'line' ? 'var(--primary-color)' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </FormGroup>
              {selectedElement.shapeType !== 'line' && (
                <>
                  <FormGroup style={{ marginBottom: '0.5rem' }}>
                    <Label>Dimensions (px)</Label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', marginRight: '0.25rem', color: 'var(--text-secondary)' }}>W:</span>
                        <Input 
                          type="number" 
                          value={selectedElement.width || 100} 
                          onChange={(e) => handleUpdateElement('width', parseInt(e.target.value, 10) || 100)} 
                          min="10"
                          max="500"
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', marginRight: '0.25rem', color: 'var(--text-secondary)' }}>H:</span>
                        <Input 
                          type="number" 
                          value={selectedElement.height || 100} 
                          onChange={(e) => handleUpdateElement('height', parseInt(e.target.value, 10) || 100)} 
                          min="10"
                          max="500"
                        />
                      </div>
                    </div>
                  </FormGroup>
                </>
              )}
              {selectedElement.shapeType === 'line' && (
                <>
                  <FormGroup>
                    <Label>Length (px)</Label>
                    <Input 
                      type="number" 
                      value={selectedElement.width || 100} 
                      onChange={(e) => handleUpdateElement('width', parseInt(e.target.value, 10) || 100)} 
                      min="10"
                      max="500"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Angle (degrees)</Label>
                    <Input 
                      type="number" 
                      value={selectedElement.angle || 0} 
                      onChange={(e) => handleUpdateElement('angle', parseInt(e.target.value, 10) || 0)} 
                      min="0"
                      max="360"
                    />
                  </FormGroup>
                </>
              )}
              <FormGroup>
                <Label>Fill Color</Label>
                <ColorPickerContainer>
                  <ColorPicker 
                    type="color" 
                    value={selectedElement.backgroundColor || '#6200ea'} 
                    onChange={(e) => handleUpdateElement('backgroundColor', e.target.value)} 
                  />
                  <HexInput 
                    type="text" 
                    value={selectedElement.backgroundColor || '#6200ea'} 
                    onChange={(e) => {
                      const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                      if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                        handleUpdateElement('backgroundColor', value);
                      }
                    }} 
                    placeholder="#RRGGBB"
                    maxLength={7}
                  />
                </ColorPickerContainer>
              </FormGroup>
              <FormGroup>
                <Label>Border Color</Label>
                <ColorPickerContainer>
                  <ColorPicker 
                    type="color" 
                    value={selectedElement.borderColor || '#000000'} 
                    onChange={(e) => handleUpdateElement('borderColor', e.target.value)} 
                  />
                  <HexInput 
                    type="text" 
                    value={selectedElement.borderColor || '#000000'} 
                    onChange={(e) => {
                      const value = e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value;
                      if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
                        handleUpdateElement('borderColor', value);
                      }
                    }} 
                    placeholder="#RRGGBB"
                    maxLength={7}
                  />
                </ColorPickerContainer>
              </FormGroup>
              <FormGroup>
                <Label>Border</Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    id="elementBorderToggle" 
                    checked={(selectedElement.borderWidth || 0) > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleUpdateElement('borderWidth', 1); // Default to 1px when enabling border
                      } else {
                        handleUpdateElement('borderWidth', 0); // Set to 0 to remove border
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <label htmlFor="elementBorderToggle" style={{ cursor: 'pointer', fontSize: '0.9rem', margin: 0 }}>
                    Show border
                  </label>
                </div>
                {(selectedElement.borderWidth || 0) > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Width:</span>
                    <Input 
                      type="number" 
                      value={selectedElement.borderWidth || 1} 
                      onChange={(e) => handleUpdateElement('borderWidth', parseInt(e.target.value, 10) || 1)} 
                      min="1"
                      max="20"
                    />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>px</span>
                  </div>
                )}
              </FormGroup>
            </>
          )}
          <ButtonGroup>
            <Button onClick={() => bringToFront(selectedElement.id)}>
              Bring to Front
            </Button>
            <Button onClick={() => sendToBack(selectedElement.id)}>
              Send to Back
            </Button>
            <Button onClick={() => deleteElement(selectedElement.id)}>
              Delete Element
            </Button>
          </ButtonGroup>
        </ElementControls>
      </Section>
    </ElementPropertiesContainer>
  )
}

export default ElementProperties
