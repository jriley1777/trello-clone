import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditableTextField from '../EditableTextField/EditableTextField';
import Placeholder from '../Placeholder/Placeholder';
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
    background: rgb(255,255,255,0.5) !important;
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
    const handleTitleChange = (value: any) => {
        if (value !== list.name) {
            listsRef.child(currentBoard).child(list.listId).set({ name: value })
        }
    }

    const itemCount = Math.floor(Math.random() * 3);
    const renderPlaceholders = () => {
        const elem = new Array(itemCount).fill(0);
        return elem.map(() => (
            <Grid item style={{ marginBottom: '8px'}}>
                <Placeholder width="16.5vw" height="10vh" />
            </Grid>
        ))
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
                            onSubmit={handleTitleChange}
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
                            {renderPlaceholders()}
                        </Grid> 
                    </Grid>
                    <Grid item>
                        <div
                            style={{
                                maxWidth: '16vw !important',
                            }}>
                            <CreateItemButton
                                name='card'
                                buttonText='Add a Card'
                                actionText='Add Card'
                                onSubmit={() => { }}
                            /> 
                        </div>
                    </Grid>
                </Grid>
            </StyledPaper>
        </StyledBLContainer>
    )
};

export default BoardList;