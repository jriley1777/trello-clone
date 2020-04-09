import React from 'react';
import Grid from "@material-ui/core/Grid";
import BoardTile from '../BoardTile/BoardTile';

import { Board } from '../../models/index.models';

interface BCListProps {
    boards: Board[];
}
const BoardCardList:React.FC<BCListProps> = ({ boards }) => {
    return (
        <>
            {
                boards.map(board => {
                    return (
                      <Grid item key={board.id}>
                        <BoardTile board={ board } />
                      </Grid>
                    );
                })
            }
        </>
    )
};

export default BoardCardList;