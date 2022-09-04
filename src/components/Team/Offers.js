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
    const [ifipoint, setIfipoint] = useState(0);
    const [shupp, setShupp] = useState(0);
    const [omlas, setOmlas] = useState(0);
    const [porkolt, setPorkolt] = useState(0);
    const [kaloz, setKaloz] = useState(0);
    const [malna, setMalna] = useState(0);
    const [part, setPart] = useState("");

    const [price, setPrice] = useState(0);

    const [trades, setTrades] = useState([]);

    const history = useHistory();
    const classes = useStyles();
    let partName = "";

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/part_price', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code)
                setPrice(response.data.price);
            else
            {
                console.log(response.data.message);
            }
        });
    },[props.token])

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
                setIfipoint(response.data.stats.ifipoint);
                setShupp(response.data.stats.parts.shupp);
                setOmlas(response.data.stats.parts.omlas);
                setPorkolt(response.data.stats.parts.porkolt);
                setKaloz(response.data.stats.parts.kaloz);
                setMalna(response.data.stats.parts.malna);
                setPart(response.data.stats.part);
            }
            else
            {
                console.log(response.data.message);
        }
        });
    },[props.token,change,shupp,omlas,porkolt,kaloz,malna])

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
        let part_nr;
        switch(part) {
            case "shupp": part_nr = shupp; break;
            case "omlas": part_nr = omlas; break;
            case "porkolt": part_nr = porkolt; break;
            case "kaloz": part_nr = kaloz; break;
            case "malna": part_nr = malna; break;
            default: part_nr = 0;
        }
        if( trade.trade.nr > part_nr)
        {
            setOpen(true);
            setText("You can't accept the offer because you don't have enough pieces!");
        }
        else {
            const data = {
                part: part,
                trade: trade
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            }

            axios.post(process.env.REACT_APP_API_URL + '/accept_trade', data, {headers: headers})
                .then((response) => {
                if(!response.data.code){
                    setChange(!change);
                    setOpen(true);
                    setText(`You have accepted ${response.data.team}'s offer! You have earned ${response.data.nr} ${response.data.part} pieces!`);
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
                setText(`You have rejected ${response.data.team}'s offer!`);
            }
            else
            {
                setOpen(true);
                setText(response.data.message);
            }
        });
    };

    switch(part) {
        case 'shupp': partName = "Shupp"; break;
        case 'omlas': partName = "Omlás"; break;
        case 'porkolt': partName = "Pörkölt"; break;
        case 'kaloz': partName = "Kalóz"; break;
        case 'malna': partName = "Málna"; break;
        default: partName = "Unknow";
    }

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
                        Back
                    </Typography>
                </ThemeProvider>
                </Toolbar>
            </AppBar>
            <div className={classes.info}>
            <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    p={1}
                    m={1}
                >
                    <Box p={1}>
                        <OreCard 
                        src='./images/xp.png'
                        title='XP'
                        ore={xp}
                        scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/ifilogo.png'
                        title='Ifipoint'
                        ore={ifipoint}
                        scale='point'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src={`./images/${part}.png`}
                            title={`${partName}`}
                            ore={price}
                            scale='XP'
                        />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    p={1}
                    m={1}
                >
                    <Box p={1}>
                        <OreCard 
                            src='./images/shupp.png'
                            title='Shupp'
                            ore={shupp}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/omlas.png'
                            title='Omlás'
                            ore={omlas}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/porkolt.png'
                            title='Pörkölt'
                            ore={porkolt}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/kaloz.png'
                            title='Kalóz'
                            ore={kaloz}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/malna.png'
                            title='Málna'
                            ore={malna}
                            scale='piece'
                        />
                    </Box>
                </Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        Offers for the team
                    </Typography>
                </ThemeProvider>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Teams
                                        </Typography>
                                    </ThemeProvider>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/give.png' alt='Give' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/get.png' alt='Get' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/nr.png' alt='Number' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Accept
                                        </Typography>
                                    </ThemeProvider>
                                </StyledTableCell>
                                <StyledTableCell align="center"> 
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Refuze
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
                                            {trade.team}'s offer'
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={'./images/what.png'} alt='Give' className={classes.table_icon}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={`./images/${trade.trade.get}.png`} alt='Get' className={classes.table_icon}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{trade.trade.nr}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Fab
                                                component="button"
                                                className={classes.submit}
                                                onClick={ () => {handleAccept(trade)}}
                                                size="small"
                                            >
                                                <CheckIcon /> 
                                            </Fab>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
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