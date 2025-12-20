import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../store/theme/ThemeContext';

const ButtonTheme = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ToggleWrapper onClick={toggleTheme}>
      <ToggleBackground isDark={isDark}>
        <ToggleCircle isDark={isDark} />
      </ToggleBackground>
    </ToggleWrapper>
  );
};

export default ButtonTheme;


const ToggleWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const ToggleBackground = styled.div<{ isDark: boolean }>`
  width: 50px;
  height: 25px;
  border-radius: 25px;
  background-color: ${({ isDark }) => (isDark ? '#2b4360' : '#83cbd8')};
  display: flex;
  align-items: center;
  padding: 3px;
  transition: background-color 0.3s;
`;

const ToggleCircle = styled.div<{ isDark: boolean }>`
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background-color: ${({ isDark }) => (isDark ? '#f8e664' : '#fff')};
  transform: ${({ isDark }) => (isDark ? 'translateX(25px)' : 'translateX(0)')};
  transition: transform 0.3s, background-color 0.3s;
`;
