import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/StarBorderRounded';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import firebase from '../../utils/firebase';
import { Board } from '../../models/index.models';
import * as Selectors from '../../selectors/index';
import * as Constants from '../../constants/index';

const StyledHeader = styled.div`
    position: relative;
    margin-top: 48px;
    height: 48px;
    font-weight: bold;
    background: rgba(0,0,0,0.25);
    color: white;
`

interface BoardHeaderProps {
    board: Board
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
    const history = useHistory();
    const starred = useSelector(Selectors.getStarredBoards);
    const currentUser = useSelector(Selectors.getCurrentUser);
    const isStarred = starred.includes(board.boardId);
    const boardsRef = firebase.database().ref('boards');
    const starredRef = firebase.database().ref('starredBoards');

    const handleStarToggle = () => {
      if(isStarred){
        starredRef.child(currentUser.uid).child(board.boardId).remove();
      } else {
        starredRef.child(currentUser.uid).child(board.boardId).set(true);
      }
    };

    const handleDeleteBoard = () => {
      const updatedBoard: Board = {
        ...board,
        deleted: true
      };
      boardsRef.child(currentUser.uid).child(board.boardId).set(updatedBoard);
      history.push(Constants.buildUserURI(currentUser.uid))
    }

    return (
      <StyledHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ height: "48px", padding: "0 20px 0 30px" }}
        >
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center" justify="flex-start">
              <Grid item>
                <h4 style={{ padding: 0, margin: 0, paddingRight: '10px' }}>{board.name}</h4>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label="star"
                  onClick={handleStarToggle}
                >
                  <StarIcon style={{ color: isStarred ? 'gold' : "white" }} />
                </IconButton>
              </Grid>  
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center" justify="flex-end">
              <Grid item>
                <IconButton
                  aria-label="delete"
                  onClick={handleDeleteBoard}
                  style={{color: 'white'}}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default BoardHeader;