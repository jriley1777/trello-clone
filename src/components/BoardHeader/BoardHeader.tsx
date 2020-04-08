import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/StarBorderRounded';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditableTextField from '../EditableTextField/EditableTextField';
import firebase from '../../utils/firebase';
import { Board } from '../../models/index.models';
import * as Selectors from '../../selectors/index';
import * as Constants from '../../constants/index';

const StyledHeader = styled.div`
    position: relative;
    margin-top: 44px;
    height: 36px;
    padding-top: 4px;
    font-weight: bold;
    background: rgba(0,0,0,0.25);
    color: white;
`

interface BoardHeaderProps {
    board: Board
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ board }) => {
    const history = useHistory();
    const currentUser = useSelector(Selectors.getCurrentUser);
    const boardsRef = firebase.database().ref('boards');

    const handleStarToggle = () => {
      if(board.isStarred){
        boardsRef.child(currentUser.id).child(board.id).set({
          ...board,
          isStarred: false
        })
      } else {
        boardsRef.child(currentUser.id).child(board.id).set({
          ...board,
          isStarred: true
        })
      }
    };

    const handleDeleteBoard = () => {
      const updatedBoard: Board = {
        ...board,
        deleted: true
      };
      boardsRef.child(currentUser.id).child(board.id).set(updatedBoard);
      history.push(Constants.buildUserURI(currentUser.id))
    }

    const handleBoardTitleChange = (value: any) => {
      if(value !== board.name) {
        const updatedBoard = {
          ...board,
          name: value
        }
        boardsRef.child(currentUser.id).child(board.id).set(updatedBoard) 
      }
    }

    return (
      <StyledHeader>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ padding: "0 5px 0 5px" }}
        >
          <Grid item xs={6}>
            <Grid container 
              direction="row" 
              alignItems="center" 
              justify="flex-start">
              <Grid item>
                <EditableTextField
                  name='name'
                  value={board.name}
                  onSubmit={handleBoardTitleChange}
                  style={{marginRight: '5px'}}
                  />
              </Grid>
              <Grid item>
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: `rgba(255,255,255,0.3)`,
                    height: '2rem',
                    width: '2.5rem',
                  }}
                >
                  <IconButton
                    aria-label="star"
                    onClick={handleStarToggle}
                  >
                    <StarIcon style={{ color: board.isStarred ? 'gold' : "white" }} />
                  </IconButton> 
                </Avatar>
              </Grid>  
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row" alignItems="center" justify="flex-end">
              <Grid item>
                <Avatar
                  variant="rounded"
                  style={{
                    backgroundColor: `rgba(255,255,255,0.3)`,
                    height: '2rem',
                    width: '2.5rem',
                  }}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={handleDeleteBoard}
                    style={{ color: 'white' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledHeader>
    );
};

export default BoardHeader;