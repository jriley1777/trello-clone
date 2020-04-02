import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const StyledPlaceholder = styled(Paper)`
  display: none;

  @media (min-width: 768px) {
    width: 100%;
    height: 50%;
    background: rgba(255, 255, 255, 0.1) !important;
    border: 2px dashed rgba(0,0,0,0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin: 0;
  }

  @media (min-width: 1024px) {
    width: 100%;
    height: 100%;
  }
`;

interface PlaceholderProps {
    width? : string;
    height? : string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ width, height }) => {
    return (
      <div style={{width, height}}>
        <StyledPlaceholder elevation={3}>placeholder</StyledPlaceholder>
      </div>
    );
};

export default Placeholder;