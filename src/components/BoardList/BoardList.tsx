import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase, { DB_REFS } from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditableTextField from '../EditableTextField/EditableTextField';
import CreateItemButton from '../CreateItemButton/CreateItemButton';
import BoardListCard from '../BoardListCard/BoardListCard';

import * as Selectors from '../../selectors/index';
import * as Types from '../../models/index.models';

const StyledBLContainer = styled.div`
    height: 95vh !important;
    z-index: 1000 !important;
`;

const StyledPaper = styled(Paper)`
    color: black !important;
    font-weight: bold !important;
    padding: 8px;
    margin-right: 8px;
    background: rgb(235,236,240) !important;
    max-height: 85vh !important;
    overflow-x: hidden !important;
    text-align: left !important;
    font-size: 0.85rem;
    width: 250px !important;
    overflow: hidden;
`;

const StyledGrid = styled(Grid)`
    & > * {
        width: 100% !important;
    }
`;

const StyledTextField = styled(EditableTextField)`
    padding-left: 12px;
`;

const StyledCreateButton = styled(CreateItemButton)`
    margin-top: 4px !important;
    width: 100% !important;
    height: 100%;
    position: fixed;
    bottom: 0;
`

interface BoardListProps {
    list: any
};

const BoardList: React.FC<BoardListProps> = ({ list }) => {
    const listsRef = DB_REFS.lists;
    const cardsRef = DB_REFS.cards;
    const currentUser = useSelector(Selectors.getCurrentUser);
    const currentBoard = useSelector(Selectors.getCurrentBoard);
    const cards = useSelector(state => Selectors.getCardsByList(state, list.id));
    const handleListNameChange = (value: any) => {
        if (value !== list.name) {
            listsRef.child(currentBoard).child(list.id).set({ ...list, name: value })
        }
    }
    const handleCardCreate = (card: { card: string}) => {
        cardsRef.child(currentBoard).push().set({
            lastUpdated: firebase.database.ServerValue.TIMESTAMP,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            createdBy: currentUser.id,
            name: card.card,
            board: currentBoard,
            list: list.id
        });
    }
    const renderCards = (cards: any) => {
        if (cards.length > 0) {
            return cards.map((card: Types.Card) => (
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
                        <div style={{
                            overflow: 'auto',
                            maxHeight: '68vh'
                            }}>
                            <StyledGrid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                                >
                                {renderCards(cards)}
                            </StyledGrid >
                        </div>
                    </Grid>
                    <Grid item>
                        <StyledCreateButton
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