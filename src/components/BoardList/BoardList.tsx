import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditableTextField from '../EditableTextField/EditableTextField';
import CreateItemButton from '../CreateItemButton/CreateItemButton';
import BoardListCard from '../BoardListCard/BoardListCard';

import * as Selectors from '../../selectors/index';

const StyledBLContainer = styled.div`
    height: 85vh !important;
`;

const StyledPaper = styled(Paper)`
    color: black !important;
    font-weight: bold !important;
    padding: 8px;
    margin-right: 8px;
    background: rgb(235,236,240) !important;
    max-height: 80vh !important;
    overflow-x: hidden !important;
    text-align: left !important;
    font-size: 0.85rem;
`;

const StyledGrid = styled(Grid)`
    & > * {
        width: 100% !important;
    }
`;

const StyledTextField = styled(EditableTextField)`
    padding-left: 12px;
`;

interface BoardListProps {
    list: any
};

const BoardList: React.FC<BoardListProps> = ({ list }) => {
    const listsRef = firebase.database().ref('lists');
    const currentBoard = useSelector(Selectors.getCurrentBoard)
    const handleListNameChange = (value: any) => {
        if (value !== list.name) {
            listsRef.child(currentBoard).child(list.id).set({ ...list, name: value })
        }
    }
    const handleCardCreate = (card: { card: string}) => {
        listsRef.child(currentBoard).child(list.id).child('cards').push().set({
            name: card.card
        });
    }
    const renderCards = () => {
        if (list.cards) {
            let cards = Object.entries(list.cards).map(([key, value]: any) => ({ id: key, ...value }))
            return cards.map((card: any, index: number) => (
                <Grid item key={card.id}>
                    <BoardListCard card={card} /> 
                </Grid>
            )); 
        }
    }

    return (
        <StyledBLContainer>
            <StyledPaper>
                <StyledGrid 
                    container 
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Grid item>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={11}>
                                <StyledTextField
                                    name='listName'
                                    value={list.name}
                                    onSubmit={handleListNameChange}
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <MoreHorizIcon fontSize="small"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <StyledGrid 
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{
                                maxHeight: '50vh'
                            }}
                            >
                            {renderCards()}
                        </StyledGrid>
                    </Grid>
                    <Grid item>
                        <CreateItemButton
                            name='card'
                            buttonText='Add another card'
                            actionText='Add card'
                            onSubmit={handleCardCreate}
                        /> 
                    </Grid>
                </StyledGrid>
            </StyledPaper>
        </StyledBLContainer>
    )
};

export default BoardList;