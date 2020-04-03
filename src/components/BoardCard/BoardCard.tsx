import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import * as Constants from '../../constants/index';
import { Board } from '../../models/index.models';

const StyledCard = styled(Card)`
  width: 164px;
  height: 88px;
  font-size: 1rem;
  background: rgb(0, 106, 166) !important;
  color: white !important;
`;

interface BoardProps extends RouteComponentProps {
    board: Board
}

const BoardCard: React.FC<BoardProps> = ({ board, history }) => {
  const { name, boardId } = board;
  const handleActionLink = (e: any) => {
    e.preventDefault();
    history.push(Constants.buildBoardURI(boardId));
  };
  return (
    <StyledCard>
      <CardActionArea
        style={{ height: "100%" }}
        href={Constants.buildBoardURI(boardId)}
        onClick={handleActionLink}
      >
        <CardContent style={{ position: "relative", top: "0px", left: "0px" }}>
          {name}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default withRouter(BoardCard);