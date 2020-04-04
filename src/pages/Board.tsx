import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppHeader from '../components/AppHeader/AppHeader';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import * as Selectors from '../selectors/index';

const PageWrapper = styled.div<{ bg: any }>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: ${props =>
    props.bg ? `url(${props.bg.url})` : `rgb(250, 251, 252)`};
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
`;


const Board = () => {
    document.title = "BoardName | Taskboagrd";
    const { boardId } = useParams();
    const boards = useSelector(Selectors.getBoards);
    const board = boards.find(x => x.boardId === boardId);
    return (
        <PageWrapper bg={board!.media}>
            <AppHeader background={!!board!.media}/>
            <BoardHeader board={ board! } />
        </PageWrapper>
    )
};

export default Board;