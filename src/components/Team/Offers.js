import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab
} from '@material-ui/core';

import PopupAlert from '../PopupAlert';
import OreCard from '../OreCard';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';
import { withStyles } from '@material-ui/core/styles';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function Trade(props) {
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [text, setText] = useState();

    const [xp, setXp] = useState(0);
    const [point, setPoint] = useState(0);
    const [dailyPoint, setDailyPoint] = useState(0);

    const [iron, setIron] = useState();
    const [bronze, setBronze] = useState();
    const [silver, setSilver] = useState();
    const [gold, setGold] = useState();
    const [diamond, setDiamond] = useState();
    const [ifirald, setIfirald] = useState();

    const [trades, setTrades] = useState([]);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/trades', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setTrades(response.data.trades);
            }
            else
            {
                console.log(response.data.message);
            }
    });
    },[props.token,change])

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/team_info', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setXp(response.data.stats.xp);
                setPoint(response.data.stats.point);
                setDailyPoint(response.data.stats.daily_point);
                setIron(response.data.stats.ores.iron);
                setBronze(response.data.stats.ores.bronze);
                setSilver(response.data.stats.ores.silver);
                setGold(response.data.stats.ores.gold);
                setDiamond(response.data.stats.ores.diamond);
                setIfirald(response.data.stats.ores.ifirald);
            }
            else
            {
                console.log(response.data.message);
        }
        });
    },[props.token,change])

    const handleBack = () => {
        history.push('/team');
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = (trade) => {
        if( trade.trade.waited_ores.iron > iron || trade.trade.waited_ores.bronze > bronze || trade.trade.waited_ores.silver > silver ||
            trade.trade.waited_ores.gold > gold || trade.trade.waited_ores.diamond > diamond || trade.trade.waited_ores.ifirald > ifirald)
        {
            setOpen(true);
            setText("Nem tudod elfogadni az ajánlatot, mert nincs elég érced!");
        }
        else {
            const data = {
                trade: trade
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }

            axios.post(process.env.REACT_APP_API_URL + '/accept_trade', data, {headers: headers})
                .then((response) => {
                if(!response.data.code){
                    let waited = "";
                    if(response.data.waited_ores.iron > 0) waited += response.data.waited_ores.iron + " - vas, ";
                    if(response.data.waited_ores.bronze > 0) waited += response.data.waited_ores.bronze + " - bronz, ";
                    if(response.data.waited_ores.silver > 0) waited += response.data.waited_ores.silver + " - ezüst, ";
                    if(response.data.waited_ores.gold > 0) waited += response.data.waited_ores.gold + " - arany, ";
                    if(response.data.waited_ores.diamond > 0) waited += response.data.waited_ores.diamond + " - gyémánt, ";
                    if(response.data.waited_ores.ifirald > 0) waited += response.data.waited_ores.ifirald + " - ifiráld, ";

                    waited = waited.slice(0, -2)
                    setChange(!change);
                    setOpen(true);
                    setText(`Elfogadtátok ${response.data.team} ajánlatát! A következő érceket szereztétek meg: ${waited}`);
                }
                else
                {
                    setOpen(true);
                    setText(response.data.message);
                }
            });
        }
    };

    const handleRefuze = (trade) => {
        console.log(trade);
        const data = {
            trade: trade
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/refuze_trade', data, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setChange(!change);
                setOpen(true);
                setText(`Elutasítottátok ${response.data.team} ajánlatát!`);
            }
            else
            {
                setOpen(true);
                setText(response.data.message);
            }
        });
    };

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                <IconButton
                    edge="end"
                    aria-label="menu"
                    color="inherit"
                    onClick={handleBack}
                >
                    <ArrowBackIcon />
                </IconButton>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.text}>
                        Visszalépés
                    </Typography>
                </ThemeProvider>
                </Toolbar>
            </AppBar>
            <div className={classes.info}>
                <div className={classes.box}>
                    <Box display="flex" >
                        <Box flexGrow={1} p={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                        >
                            <Box p={1}>
                            <img alt="XPs" src="/images/xp.png" className={classes.bar}/>
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        {xp}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                        </Box>
                        <Box p={1}>
                            <Box 
                                display="flex"
                                alignItems="flex-start"
                            >
                                <Box p={1}>
                                    <img alt="Poitns" src="/images/point.png" className={classes.bar}/>
                                </Box>
                                <Box p={2}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h5">
                                            {point}
                                        </Typography>
                                    </ThemeProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    </div>
                    <div className={classes.box}>
                    <Box display="flex" justifyContent="center">
                        <Box p={1}>
                            <Box 
                                display="flex"
                                alignItems="center"
                            >
                                <Box p={1}>
                                    <img alt="Napi pont" src="/images/dailypoint.png" className={classes.bar}/>
                                </Box>
                                <Box p={2}>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h5">
                                            {dailyPoint}
                                        </Typography>
                                    </ThemeProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    p={1}
                    m={1}
                >
                    <Box p={1}>
                        <OreCard 
                        src='./images/iron.png'
                        title='Vas'
                        ore={iron}
                        scale='darab'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/bronze.png'
                        title='Bronz'
                        ore={bronze}
                        scale='darab'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/silver.png'
                        title='Ezüst'
                        ore={silver}
                        scale='darab'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/gold.png'
                        title='Arany'
                        ore={gold}
                        scale='darab'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/diamond.png'
                        title='Gyémánt'
                        ore={diamond}
                        scale='darab'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/ifirald.png'
                        title='Ifiráld'
                        ore={ifirald}
                        scale='darab'
                        />
                    </Box>
                </Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        Ajánlatok a csapatnak
                    </Typography>
                </ThemeProvider>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Csapatok
                                        </Typography>
                                    </ThemeProvider>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/iron.png' alt='Vas' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/bronze.png' alt='Bronz' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/silver.png' alt='Ezüst' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/gold.png' alt='Arany' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/diamond.png' alt='Gyémánt' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/ifirald.png' alt='Ifiráld' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Elfogad
                                        </Typography>
                                    </ThemeProvider>
                                </StyledTableCell>
                                <StyledTableCell align="center"> 
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Elutasít
                                        </Typography>
                                    </ThemeProvider> 
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            trades.map((trade,i) => (
                                <>
                                    <StyledTableRow key={i+1}>
                                        <StyledTableCell component="th" scope="row">
                                            {trade.team} ajánlata
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.iron}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.bronze}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.silver}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.gold}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.diamond}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.pushed_ores.ifirald}</StyledTableCell>
                                        <StyledTableCell rowSpan={2} align="center">
                                            <Fab
                                                component="button"
                                                className={classes.submit}
                                                onClick={ () => {handleAccept(trade)}}
                                                size="small"
                                            >
                                                <CheckIcon /> 
                                            </Fab>
                                        </StyledTableCell>
                                        <StyledTableCell rowSpan={2} align="center">
                                            <Fab
                                                component="button"
                                                className={classes.submit}
                                                onClick={() => {handleRefuze(trade)}}
                                                size="small"
                                            >
                                                <CloseIcon /> 
                                            </Fab>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow key={(i+1)*10+i}>
                                        <StyledTableCell component="th" scope="row">
                                            {trade.team} kérése
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.iron}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.bronze}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.silver}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.gold}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.diamond}</StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.waited_ores.ifirald}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <PopupAlert 
                    open={open}
                    handleClose={handleClose}
                    handleClickOpen={handleClickOpen}
                    text={text}
                />
            </div>
        </div>
    );
}