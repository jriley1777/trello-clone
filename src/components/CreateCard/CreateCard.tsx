import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../../utils/firebase';
import { unsplash, toJson } from '../../utils/unsplash';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import * as Selectors from '../../selectors/index';
import { DEFAULT_BOARD_COLOR } from '../../constants/index';

const StyledCard = styled(Card)`
  width: 164px;
  height: 88px;
  font-size: 1.25rem !important;
  background: rgba(9,30,66,.04) !important;
  color: black;
`;

const CreateCard = () => {
    const currentUser = useSelector(Selectors.getCurrentUser);
    const boardsRef = firebase.database().ref("boards");
    const handleCreateBoard = async () => {
        let defaultBoard = {
            name: 'Board ' + Math.floor(Math.random()*1000),
            bg: {
                color: DEFAULT_BOARD_COLOR,
                media: {}
            }
        };
        await unsplash.photos
            .getRandomPhoto({ query: 'nature', orientation: 'landscape'})
            .then(toJson)
            .then(json => defaultBoard.bg.media = json)
            .catch(err => console.log(err));
        console.log(defaultBoard)
        boardsRef.child(currentUser.uid).push().set(defaultBoard);
    }
    return (
        <StyledCard>
            <CardActionArea
                style={{ height: "100%" }}
                onClick={handleCreateBoard}
                >
                <CardContent style={{fontSize: '0.85rem'}}>
                  Create new board
                </CardContent>
            </CardActionArea>
        </StyledCard>
    )
};

export default CreateCard;