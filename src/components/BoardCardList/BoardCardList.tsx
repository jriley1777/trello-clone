import React from 'react';

import Grid from "@material-ui/core/Grid";
import BoardCard from '../BoardCard/BoardCard';

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
                      <Grid item key={board.name}>
                        <BoardCard board={ board } />
                      </Grid>
                    );
                })
            }
        </>
    )
};

export default BoardCardList;