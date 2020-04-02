import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header.attrs({
  className: "header"
})`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Header: React.FC = ({ children }) => {
    return (
        <StyledHeader>{children}</StyledHeader>
    )
};

export default Header;