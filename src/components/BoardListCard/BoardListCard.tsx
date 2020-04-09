import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import firebase, { DB_REFS } from '../../utils/firebase';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import EditableTextField from '../EditableTextField/EditableTextField';
import CreateItemButton from '../CreateItemButton/CreateItemButton';

import WebIcon from '@material-ui/icons/Web';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as Selectors from '../../selectors/index';

const StyledCard = styled(Paper)`
    background: white;
    display: flex;
    flexGrow: 1;
    padding: 12px;
    min-width: 226px;
    max-width: 16.5vw;
    margin: 4px 0 4px 0;
    font-weight: 600;
    word-wrap; wrap;
    height: 40px;

    &:hover {
        background: rgba(0,0,0,0.1);
        cursor: pointer;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 1.3rem !important;
    height: 1.3rem !important;
    border: 1px solid rgba(0,0,0,0.1);
`;

const StyledDialogContent = styled(DialogContent)`
    height: 66vh !important;
`;

interface BLCProps {
    card: any
}

const BoardListCard: React.FC<BLCProps> = ({ card }) => {
    const currentUser = useSelector(Selectors.getCurrentUser);
    const currentBoard = useSelector(Selectors.getCurrentBoard);
    const cardsRef = DB_REFS.cards;
    const cardItemsRef = DB_REFS.cardItems;


    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const handleCardNameChange = (value: string) => {
        cardsRef.child(currentBoard).child(card.id).set({
            ...card,
            name: value
        })
    }
    const handleCardDescChange = (value: string) => {
        cardsRef.child(currentBoard).child(card.id).set({
            ...card,
            description: value
        })
    }
    const handleCardItemCreate = (value: { checklistItem: string}) => {
        cardItemsRef.child(currentBoard).push().set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP,
            createdBy: currentUser.id,
            name: value.checklistItem,
            card: card.id,
            list: card.list,
            board: currentBoard
        })
    }


    return (
        <>
            <StyledCard
                onClick={handleClickOpen('paper')}
                elevation={1}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={10}>{card.name}</Grid>
                            <Grid item xs={2}>
                                <Grid container direction="row">
                                    <StyledAvatar
                                        style={{ marginLeft: 'auto' }}
                                        src={currentUser.photoURL} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </StyledCard>

            <Dialog
                open={open}
                fullWidth
                maxWidth={'sm'}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">
                    <Grid container direction="column" justify="flex-start" spacing={1}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={10}>
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                    <Grid item xs={1}>
                                        <WebIcon fontSize="small" style={{paddingTop:'5px'}} />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Typography variant="subtitle2">
                                            <EditableTextField 
                                                name='cardName'
                                                value={card.name}
                                                onSubmit={handleCardNameChange}
                                            />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton 
                                    aria-label="Close"
                                    onClick={handleClose}
                                    >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="overline">
                                        Members:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <StyledAvatar
                                        src={currentUser.photoURL} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="overline">
                                        Description:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <EditableTextField 
                                        style={{fontSize:'0.9rem'}}
                                        value={card.description}
                                        placeholder='Enter a description'
                                        name='description'
                                        onSubmit={handleCardDescChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <StyledDialogContent dividers={scroll === 'paper'}>
                    <Grid container direction="column" justify="flex-start" spacing={1}>
                        <Grid item>
                            <DialogContentText
                                id="scroll-dialog-description"
                                ref={descriptionElementRef}
                                tabIndex={-1}
                            >
                                <Typography variant="overline" style={{ color: 'black' }}>
                                    Checklist:
                                </Typography>
                            </DialogContentText>
                        </Grid>
                        <Grid item>
                            <CreateItemButton
                                name='checklistItem'
                                onSubmit={handleCardItemCreate}
                                actionText='Add to do'
                                buttonText='Add an item'
                            />  
                        </Grid>
                    </Grid>
                </StyledDialogContent>
            </Dialog>
        </>
    )
};

export default BoardListCard;