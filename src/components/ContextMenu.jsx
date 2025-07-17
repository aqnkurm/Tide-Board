import React from 'react';
import styled from '@emotion/styled';

const MenuContainer = styled.div`
  position: fixed;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  min-width: 180px;
  z-index: 1000;
  animation: fadeIn 0.15s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-primary);
  font-size: 14px;
  
  &:hover {
    background-color: var(--background-color);
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
  }
  
  &.delete {
    color: #e53935;
    
    svg {
      color: #e53935;
    }
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.08);
  margin: 4px 0;
`;

const ContextMenu = ({ x, y, onClose, onAddText, onAddImage, onAddShape, onDeleteElement, forElement }) => {
  // Handle click outside to close the menu
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <MenuContainer style={{ top: y, left: x }}>
      {forElement ? (
        // Element-specific context menu
        <>
          <MenuItem className="delete" onClick={(e) => {
            e.stopPropagation(); // Prevent the click from bubbling up
            onDeleteElement(); // Call the delete function
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Element
          </MenuItem>
        </>
      ) : (
        // Board context menu
        <>
          <MenuItem onClick={onAddText}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 10h4V3H3v7h4"></path>
              <path d="M7 3v10"></path>
              <path d="M17 3v10"></path>
              <path d="M7 13h10"></path>
              <path d="M12 13v8"></path>
            </svg>
            Add Text
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={onAddImage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            Add Image
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => onAddShape('rectangle')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
            Add Rectangle
          </MenuItem>
          <MenuItem onClick={() => onAddShape('circle')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Add Circle
          </MenuItem>
          <MenuItem onClick={() => onAddShape('line')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Line
          </MenuItem>
        </>
      )}
    </MenuContainer>
  );
};

export default ContextMenu;