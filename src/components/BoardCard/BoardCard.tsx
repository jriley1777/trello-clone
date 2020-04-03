import React from 'react';
import styled from 'styled-components';

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";


const StyledCard = styled(Card)`
  width: 164px;
  height: 88px;
  font-size: 1rem;
  background: rgb(0, 106, 166) !important;
  color: white !important;
`;

interface BoardProps {
    name: string
}

const BoardCard: React.FC<BoardProps> = ({ name }) => {
    return (
        <StyledCard>
            <CardActionArea style={{ height: "100%" }}>
                <CardContent style={{ position: "relative", top: "0px", left: "0px" }}>
                    { name }
                </CardContent>
            </CardActionArea>
        </StyledCard>
    );
};

export default BoardCard;