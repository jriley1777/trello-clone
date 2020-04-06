import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditableTextField from '../EditableTextField/EditableTextField';
import CreateItemButton from '../CreateItemButton/CreateItemButton';

import * as Selectors from '../../selectors/index';

const StyledBLContainer = styled.div`
    height: 85vh !important;
`;

const StyledPaper = styled(Paper)`
    color: black !important;
    font-weight: bold !important;
    padding: 8px !important;
    margin-right: 8px;
    background: rgb(235,236,240) !important;
    min-width: 17vw !important;
    max-height: 80vh !important;
    overflow-x: hidden !important;
`;

interface BoardListProps {
    list: any
};

const BoardList: React.FC<BoardListProps> = ({ list }) => {
    const listsRef = firebase.database().ref('lists');
    const currentBoard = useSelector(Selectors.getCurrentBoard)
    const handleListNameChange = (value: any) => {
        if (value !== list.name) {
            listsRef.child(currentBoard).child(list.listId).set({ name: value })
        }
    }
    const handleCardCreate = (card: { card: string}) => {
        console.log(card)
        listsRef.child(currentBoard).child(list.listId).child('cards').push().set({
            name: card.card
        });
    }
    console.log(list);
    const renderCards = () => {
        if (list.cards) {
            return list.cards.map((card: any) => (
                <Grid key={card.cardId} item style={{ marginBottom: '8px' }}>
                    {card.name}
                </Grid>
            )); 
        }
    }

    return (
        <StyledBLContainer>
            <StyledPaper>
                <Grid 
                    container 
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        <EditableTextField
                            name='listName'
                            value={list.name}
                            onSubmit={handleListNameChange}
                            style={{ width: '100% !important' }}
                        />
                    </Grid>
                    <Grid item>
                        <Grid container
                            direction="column"
                            alignItems="flex-start"
                            style={{
                                maxHeight: '50vh'
                            }}
                            >
                            {renderCards()}
                        </Grid> 
                    </Grid>
                    <Grid item>
                        <div
                            style={{
                                background: '#fff !important',
                                maxWidth: '16vw !important',
                            }}>
                            <CreateItemButton
                                name='card'
                                buttonText='Add a Card'
                                actionText='Add Card'
                                onSubmit={handleCardCreate}
                            /> 
                        </div>
                    </Grid>
                </Grid>
            </StyledPaper>
        </StyledBLContainer>
    )
};

export default BoardList;