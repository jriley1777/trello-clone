import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';

import * as Constants from '../../constants/index';
import { Board } from '../../models/index.models';

const StyledCard = styled(Card)`
  width: 164px;
  height: 88px;
  font-size: 1rem;
  background: rgb(0, 106, 166) !important;
  color: white !important;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 100%;
  z-index: -1;
`

interface BoardProps extends RouteComponentProps {
    board: Board
}

const BoardCard: React.FC<BoardProps> = ({ board, history }) => {
  const { name, boardId } = board;

  const handleActionLink = (e: any) => {
    e.preventDefault();
    history.push(Constants.buildBoardURI(boardId));
  };

  const renderMedia = () => {
    console.log(board, board.hasOwnProperty("media"));
    return board.hasOwnProperty("media") ? (
      <StyledCardMedia image={board.media!.url} title={board.media!.alt} />
    ) : null;
  }
  
  return (
    <StyledCard>
      <CardActionArea
        style={{ height: "100%" }}
        href={Constants.buildBoardURI(boardId)}
        onClick={handleActionLink}
      >
        {renderMedia()}
        <CardContent
          style={{ position: "absolute", top: "0", left: "0", fontWeight: 'bold' }}
        >
          {name}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default withRouter(BoardCard);