import React, { useState } from 'react';
import styled from '@emotion/styled';
import ThemeSelector from './ThemeSelector';
import ConfirmDialog from './ConfirmDialog';

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
`;

const ModalContent = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
`;

const SettingSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:focus {
    outline: none;
  }
`;

const CloseButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #ddd;
  color: var(--text-secondary);
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DeleteAllButton = styled(Button)`
  background-color: #ff5252;
  border: none;
  color: white;
  margin-right: auto; /* Push to the left */
  
  &:hover {
    background-color: #ff1744;
  }
`;

function SettingsModal({ isOpen, onClose, boards, deleteBoard }) {
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  
  if (!isOpen) return null;
  
  const handleDeleteAllBoards = () => {
    // Close the confirmation dialog
    setShowDeleteAllConfirm(false);
    
    // Delete all boards one by one
    if (boards && boards.length > 0) {
      boards.forEach(board => {
        deleteBoard(board.id);
      });
    }
  };
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Settings</ModalTitle>
        </ModalHeader>
        
        <SettingSection>
          <SectionTitle>Theme</SectionTitle>
          <ThemeSelector />
        </SettingSection>
        
        <SettingSection>
          <SectionTitle>Data Management</SectionTitle>
          <DeleteAllButton 
            onClick={() => setShowDeleteAllConfirm(true)}
            disabled={!boards || boards.length === 0}
          >
            Delete All Mood Boards
          </DeleteAllButton>
        </SettingSection>
        
        <ButtonGroup>
          <CloseButton onClick={onClose}>
            Close
          </CloseButton>
        </ButtonGroup>
        
        <ConfirmDialog
          isOpen={showDeleteAllConfirm}
          title="Delete All Mood Boards"
          message="Are you sure you want to delete all mood boards? This action cannot be undone."
          onConfirm={handleDeleteAllBoards}
          onCancel={() => setShowDeleteAllConfirm(false)}
        />
      </ModalContent>
    </ModalOverlay>
  );
}

export default SettingsModal;