import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase from '../../utils/firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditableTextField from '../EditableTextField/EditableTextField';
import Placeholder from '../Placeholder/Placeholder';

import * as Selectors from '../../selectors/index';

const StyledPaper = styled(Paper)`
    color: black !important;
    font-weight: bold !important;
    padding: 8px !important;
    background: rgb(255,255,255,0.5) !important;
    width: 18vw;
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
    return (
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
                    <Placeholder width="17.5vw" height="10vh" />
                </Grid>
                <Grid item>
                    <Placeholder width="17.5vw" height="10vh" />
                </Grid>
                <Grid item>
                    <Placeholder width="17.5vw" height="10vh" />
                </Grid>
            </Grid>
        </StyledPaper>
    )
};

export default BoardList;