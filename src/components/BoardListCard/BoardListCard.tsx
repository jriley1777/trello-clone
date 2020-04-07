import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const StyledCard = styled(Paper)`
    background: white;
    height: 60px;
    display: flex;
    flexGrow: 1;
    padding: 12px;
    margin: 4px 0 4px 0;

    &:hover {
        background: rgba(0,0,0,0.1);
        cursor: pointer;
    }
`;

interface BLCProps {
    card: any
}

const BoardListCard: React.FC<BLCProps> = ({ card }) => {
    return (
        <StyledCard
            elevation={1}>
            {card.name}
        </StyledCard>
    )
};

export default BoardListCard;