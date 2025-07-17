import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '../context/ThemeContext';

const ThemeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThemeButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${props => props.isActive ? 'white' : 'transparent'};
  background-color: ${props => props.color};
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:hover::after {
    content: attr(title);
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
  }
  
  &:focus {
    outline: none;
  }
`;

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme, themes, themeNames } = useTheme();
  
  return (
    <ThemeContainer>
      {themeNames.map(theme => (
        <ThemeButton
          key={theme.id}
          color={themes[theme.id].primary}
          isActive={currentTheme === theme.id}
          onClick={() => setCurrentTheme(theme.id)}
          title={theme.name}
          aria-label={`Switch to ${theme.name} theme`}
        />
      ))}
    </ThemeContainer>
  );
};

export default ThemeSelector;