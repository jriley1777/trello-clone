import React from 'react';

import Grid from "@material-ui/core/Grid";
import BoardCard from '../BoardCard/BoardCard';

interface BCListProps {
    boards: {name: string}[];
}
const BoardCardList:React.FC<BCListProps> = ({ boards }) => {

    return (
        <Grid container direction="row" spacing={1}>
            {
                boards.map(board => {
                    return (
                      <Grid item>
                        <BoardCard name={ board.name } />
                      </Grid>
                    );
                })
            }
        </Grid>
    )
};

export default BoardCardList;