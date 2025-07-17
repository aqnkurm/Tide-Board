import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import SettingsModal from './SettingsModal'
import ConfirmDialog from './ConfirmDialog'
import BoardPreview from './BoardPreview'

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
`

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
`

const BoardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const BoardCard = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  height: 250px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`

const BoardPreviewWrapper = styled.div`
  height: 180px;
  overflow: hidden;
`

const BoardInfo = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BoardName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ff5252;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 82, 82, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 82, 82, 0.3);
  }
`

const DeleteIcon = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
`

const CreateButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  height: 250px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    background-color: #7c4dff;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`

const CreateIcon = styled.span`
  font-size: 2rem;
  margin-right: 0.5rem;
`

const SettingsButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  color: var(--primary-color);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  
  &:hover {
    background-color: rgba(98, 0, 234, 0.1);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(98, 0, 234, 0.3);
  }
  
  svg {
    width: 22px;
    height: 22px;
  }
`

const StatsContainer = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StatValue = styled.span`
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-right: 1rem;
`

const StatsInfo = styled.div`
  display: flex;
  align-items: center;
`

const StatsCreateButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    background-color: #7c4dff;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const StatLabel = styled.span`
  font-size: 1.1rem;
  color: var(--text-secondary);
`

function HomePage({ boards, deleteBoard }) {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  
  return (
    <HomeContainer>
      <Header>
        <Title>Tide Board</Title>
        <Subtitle>Create and organize your visual inspirations</Subtitle>
        <SettingsButton 
          onClick={() => setShowSettingsModal(true)}
          title="Settings"
          aria-label="Open Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </SettingsButton>
      </Header>
      
      <StatsContainer>
        <StatsInfo>
          <StatValue>{boards.length}</StatValue>
          <StatLabel>Tide {boards.length === 1 ? 'Board' : 'Boards'} Created</StatLabel>
        </StatsInfo>
        <Link to="/board/new" style={{ textDecoration: 'none' }}>
          <StatsCreateButton>
            <span>+</span>
            <span>Create New Board</span>
          </StatsCreateButton>
        </Link>
      </StatsContainer>
      
      <BoardsGrid>
        {boards.map(board => (
          <div key={board.id} style={{ position: 'relative' }}>
            <Link to={`/board/${board.id}`} style={{ textDecoration: 'none' }}>
              <BoardCard>
                <BoardPreviewWrapper>
                  <BoardPreview board={board} />
                </BoardPreviewWrapper>
                <BoardInfo>
                  <BoardName>{board.name}</BoardName>
                  <DeleteButton 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setBoardToDelete(board);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    <DeleteIcon>×</DeleteIcon>
                  </DeleteButton>
                </BoardInfo>
              </BoardCard>
            </Link>
          </div>
        ))}
        
        <Link to="/board/new" style={{ textDecoration: 'none' }}>
        </Link>
      </BoardsGrid>
      
      <SettingsModal 
        isOpen={showSettingsModal} 
        onClose={() => setShowSettingsModal(false)}
        boards={boards}
        deleteBoard={deleteBoard}
      />
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Board"
        message={boardToDelete ? `Are you sure you want to delete "${boardToDelete.name}"? This action cannot be undone.` : ''}
        onConfirm={() => {
          if (boardToDelete) {
            deleteBoard(boardToDelete.id);
            setBoardToDelete(null);
            setShowDeleteConfirm(false);
          }
        }}
        onCancel={() => {
          setBoardToDelete(null);
          setShowDeleteConfirm(false);
        }}
      />
    </HomeContainer>
  )
}

export default HomePage