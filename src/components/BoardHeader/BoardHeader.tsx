import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Board } from '../../models/index.models';

const StyledHeader = styled.div`
    position: relative;
    margin-top: 48px;
    height: 48px;
    font-weight: bold;
    background: rgba(0,0,0,0.05);
    color: white;
`

interface BoardHeaderProps {
    board: Board
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
    return (
      <StyledHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ height: "48px", padding: "0 20px 0 30px" }}
        >
          <Grid item>
            <h4 style={{ padding: 0, margin: 0 }}>{board.name}</h4>
          </Grid>
          <Grid item>
            <h4 style={{ padding: 0, margin: 0 }}>{board.boardId}</h4>
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default BoardHeader;