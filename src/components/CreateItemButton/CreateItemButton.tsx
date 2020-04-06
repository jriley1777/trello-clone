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
    width: 17vw !important;
    margin: 0 !important;
`;
const StyledPaper = styled(Paper)`
    background: rgb(235,235,240);
    width: 17vw !important;
    padding: 4px;
`;

interface CLButtonProps {
    name: string,
    onSubmit: any,
    buttonText: string,
    actionText: string,
    defaultValue?: any,
    stayActive?: boolean
}

const CreateItemButton: React.FC<CLButtonProps> = ({ 
    onSubmit, 
    name, 
    buttonText, 
    actionText, 
    defaultValue='',
    stayActive=false
 }) => {
    const [isActive, setIsActive] = useState(false);
    const [fieldValue, setFieldValue] = useState(defaultValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(fieldValue !== defaultValue && fieldValue) {
            onSubmit({ [name]: fieldValue });
            setFieldValue('');
            if(!stayActive) {
                setIsActive(false);
            }
        }
    }

    const toggleActive = () => {
        setIsActive(!isActive);
    }
    return !isActive ? (
        <div>
            <StyledButton 
                fullWidth
                onClick={toggleActive}
                startIcon={<AddIcon />}
                >
                { buttonText } 
            </StyledButton>
        </div>
    ) : (
        <div>
            <StyledPaper 
                elevation={0}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <TextField 
                                    fullWidth 
                                    autoFocus
                                    variant="outlined" 
                                    size="small" 
                                    style={{background:'white'}}
                                    name={name}
                                    value={fieldValue}
                                    onChange={(e) => setFieldValue(e.target.value)}
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
                                        >{ actionText }</Button>
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
        </div>
    )
};

export default CreateItemButton;