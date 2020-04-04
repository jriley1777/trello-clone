import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';

import * as Constants from '../../constants/index';
import { Board } from '../../models/index.models';

const StyledCard = styled(Card)<{bg: any}>`
  width: 164px;
  height: 88px;
  font-size: 1rem;
  background: ${props => props.bg.color} !important;
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
    return board.bg.media!.url ? (
      <StyledCardMedia image={board.bg.media!.url} title={board.bg.media!.alt} />
    ) : null;
  }
  
  return (
    <StyledCard bg={board.bg}>
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