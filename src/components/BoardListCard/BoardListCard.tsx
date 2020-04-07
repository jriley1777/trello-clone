import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

import * as Selectors from '../../selectors/index';

const StyledCard = styled(Paper)`
    background: white;
    display: flex;
    flexGrow: 1;
    padding: 12px;
    max-width: 16.5vw;
    margin: 4px 0 4px 0;
    font-weight: 600;
    word-wrap; wrap;

    &:hover {
        background: rgba(0,0,0,0.1);
        cursor: pointer;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 1.7rem !important;
    height: 1.7rem !important;
    margin-left: auto;
    border: 1px solid rgba(0,0,0,0.1);
`;

interface BLCProps {
    card: any
}

const BoardListCard: React.FC<BLCProps> = ({ card }) => {
    const currentUser = useSelector(Selectors.getCurrentUser);
    return (
        <StyledCard
            elevation={1}>
                <Grid container direction="column">
                    <Grid item>{ card.name }</Grid>
                    <Grid item>
                        <Grid container direction="row">
                            <StyledAvatar
                                src={currentUser.photoURL}/>
                        </Grid>
                    </Grid>
                </Grid>
        </StyledCard>
    )
};

export default BoardListCard;