import React, { useState } from 'react';
import styled from 'styled-components';
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
`;
const StyledPaper = styled(Paper)`
    background: rgb(235,235,240) !important;
    padding: 4px;
`;


const CreateListButton = () => {
    const [isActive, setIsActive] = useState(false);
    const [name, setName] = useState('');
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
                                    >Add List</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    size="small" 
                                    onClick={toggleActive}
                                    startIcon={<CloseIcon />}
                                /> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
        </StyledPaper>
    )
};

export default CreateListButton;