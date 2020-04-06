import React, { useState } from 'react';
import styled from 'styled-components';
import firebase from '../../utils/firebase';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const StyledButton = styled(Button)`
    background: rgba(255,255,255,0.5) !important;
    color: black !important;
    font-size: 0.8rem !important;
    width: 18vw !important;
    margin: 0 !important;
`;
const StyledPaper = styled(Paper)`
    background: rgb(235,235,240) !important;
    width: 18vw !important;
    padding: 4px;
`;

interface CLButtonProps {
    boardId: string
}

const CreateListButton: React.FC<CLButtonProps> = ({ boardId }) => {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
    const listsRef = firebase.database().ref('lists');

    const handleListSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        listsRef.child(boardId).push().set({name})
        setName('');
    }

    const toggleActive = () => {
        setIsActive(!isActive);
    }
    return !isActive ? (
        <StyledButton 
            fullWidth
            onClick={toggleActive}
            startIcon={<AddIcon />}
            >
            Add a List
        </StyledButton>
    ) : (
        <StyledPaper 
            elevation={0}>
                <form onSubmit={handleListSubmit}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <TextField 
                                fullWidth 
                                autoFocus
                                variant="outlined" 
                                size="small" 
                                style={{background:'white'}}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                /> 
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={1}>
                                <Grid item>
                                    <Button 
                                        size="small" 
                                        style={{
                                            background: 'rgb(87,172,75)',
                                            color: 'white'
                                        }}
                                        type="submit"
                                        >Add List</Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        size="small" 
                                        onClick={toggleActive}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
        </StyledPaper>
    )
};

export default CreateListButton;