import React from 'react';

import Grid from "@material-ui/core/Grid";
import BoardCard from '../BoardCard/BoardCard';
import CreateBoardCard from '../CreateCard/CreateCard';

import { Board } from '../../models/index.models';

interface BCListProps {
    boards: Board[];
}
const BoardCardList:React.FC<BCListProps> = ({ boards }) => {
    return (
        <Grid container direction="row" spacing={1}>
            {
                boards.map(board => {
                    return (
                      <Grid item key={board.name}>
                        <BoardCard board={ board } />
                      </Grid>
                    );
                })
            }
            <Grid item>
                <CreateBoardCard />
            </Grid>
        </Grid>
    )
};

export default BoardCardList;