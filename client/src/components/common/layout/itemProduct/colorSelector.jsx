import React from 'react';
import styled, { css } from 'styled-components';

const ColorSelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 250px;
`;

const ColorCircleContainer = styled.div`
  display: flex;
  margin-top: 30px;

`;

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  ${({ color }) => css`
    background-color: ${color};
  `}

  ${({ selected }) => selected && css`
    border-color: #000;
  `}
`;

const SelectedColorLabel = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #555;
`;

const colorNames = {
  '#FF5733': 'ЧЕРВОНИЙ',
  '#33FF57': 'ЗЕЛЕНИЙ',
  '#3357FF': 'СИНІЙ'
};

const ColorSelector = ({ colors, selectedColor, onSelect }) => {
  return (
    <ColorSelectorContainer>
      {selectedColor && (
        <SelectedColorLabel>
          {`Обраний колір: ${colorNames[selectedColor]}` || 'Оберіть колір'}
        </SelectedColorLabel>
      )}
      <ColorCircleContainer>
        {colors.map(color => (
          <ColorCircle
            key={color}
            color={color}
            selected={color === selectedColor}
            onClick={() => onSelect(color)}
          />
        ))}
      </ColorCircleContainer>

    </ColorSelectorContainer>
  );
};

export default ColorSelector;
