import React from 'react';
import styled from '@emotion/styled';

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
  max-width: 400px;
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

const ModalMessage = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
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

const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid #ddd;
  color: var(--text-secondary);
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #ff5252;
  border: none;
  color: white;
  
  &:hover {
    background-color: #ff1744;
  }
`;

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title || 'Confirm Action'}</ModalTitle>
        </ModalHeader>
        
        <ModalMessage>
          {message || 'Are you sure you want to proceed with this action?'}
        </ModalMessage>
        
        <ButtonGroup>
          <CancelButton onClick={onCancel}>
            Cancel
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            Confirm
          </ConfirmButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ConfirmDialog;