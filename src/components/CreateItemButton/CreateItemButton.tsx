import React, { useState } from 'react';
import styled from 'styled-components';

import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';

const StyledButton = styled(ButtonBase)`
    background: rgba(255,255,255,0.5) !important;
    color: rgb(93,107,130) !important;
    font-size: 1rem !important;
    width: 250px !important;
    margin: 0 !important;
    text-align: left;
    padding: 10px !important;
    border-radius: 5px !important;
    &:hover {
        color: black !important;
        background: rgba(0,0,0,0.1) !important;
    }
`;
const StyledPaper = styled(Paper)`
    background: rgb(235,235,240);
    width: 242px !important;
    padding: 4px !important;
    height: 100% !important;
`;

interface CLButtonProps {
    name: string,
    onSubmit: any,
    buttonText: string,
    actionText: string,
    defaultValue?: any,
    stayActive?: boolean,
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
                focusRipple
                onClick={toggleActive}
                >
                <Grid 
                    container 
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    >
                    <Grid item>
                        <AddIcon style={{ marginRight: '2px', paddingTop:'2px', fontSize: '1rem' }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2">
                            {buttonText}
                        </Typography>
                    </Grid>
                </Grid>
            </StyledButton>
        </div>
    ) : (
        <div>
            <StyledPaper 
                elevation={0}>
                    <form onSubmit={handleSubmit}>
                        <Grid 
                            container 
                            direction="column" 
                            justify="flex-start"
                            spacing={1}
                            >
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
                                        <ButtonBase 
                                            focusRipple
                                            style={{
                                                background: 'rgb(87,172,75)',
                                                color: 'white',
                                                padding: '2px 10px 2px 10px'
                                            }}
                                            type="submit"
                                        >
                                            <Typography variant="subtitle2">
                                                {actionText}
                                            </Typography>
                                    </ButtonBase>
                                    </Grid>
                                    <Grid item>
                                        <ButtonBase
                                            focusRipple
                                            onClick={toggleActive}
                                        >
                                            <CloseIcon  />
                                        </ButtonBase>
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