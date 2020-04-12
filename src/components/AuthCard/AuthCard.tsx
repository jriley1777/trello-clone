import React from 'react';
import styled from 'styled-components';
import Paper from "@material-ui/core/Paper";

const StyledPaper = styled(Paper)`
//   background: rgb(250,251,252);
  color: rgb(94, 108, 131) !important;
  font-size: 0.75rem;
  min-height: 60vh;
  padding: 2rem 0 2rem 0;
  box-shadow: 0px 0px 10px lightgrey !important;
`;

const AuthCard: React.FC = ({ children }) => {
    return (
        <StyledPaper>
            { children }
        </StyledPaper>
    )
};

export default AuthCard;