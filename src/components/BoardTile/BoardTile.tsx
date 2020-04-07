import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/StarBorderRounded';
import * as Selectors from '../../selectors/index';

import * as Constants from '../../constants/index';
import { Board } from '../../models/index.models';

const StyledCard = styled(Card)<{bg: any}>`
  width: 180px;
  height: 100px;
  font-size: 1rem;
  background: ${props => props.bg.color} !important;
  color: white !important;
  position: relative;
  padding: 0;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 100%;
  z-index: -1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2) !important;
  }
`

interface BoardProps extends RouteComponentProps {
    board: Board,
}

const BoardCard: React.FC<BoardProps> = ({ board, history }) => {
  const handleActionLink = (e: any) => {
    e.preventDefault();
    history.push(Constants.buildBoardURI(board.id));
  };

  const renderMedia = () => {
    return board.bg.media!.urls ? (
      <StyledCardMedia image={board.bg.media!.urls.small} title={board.bg.media!.alt_description} />
    ) : null;
  }
  
  return (
    <StyledCard bg={board.bg} title={board.name}>
      <CardActionArea
        style={{ height: "100%" }}
        href={Constants.buildBoardURI(board.id)}
        onClick={handleActionLink}
      >
        {renderMedia()}
        <CardContent
          style={{ position: "absolute", top: "0", left: "0", padding: "8px" }}
        >
          <h4 style={{margin: 0}}>{board.name}</h4>
        </CardContent>
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '0', 
            right: '4px', 
            }}>
          <StarIcon style={{ 
            color: board.isStarred ? 'gold' : 'white',
            display: board.isStarred ? 'inline-block' : 'none'
            }}/> 
        </div>
      </CardActionArea>
    </StyledCard>
  );
};

export default withRouter(BoardCard);