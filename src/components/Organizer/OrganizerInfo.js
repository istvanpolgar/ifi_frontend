import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    InputLabel,
    Select,
    Box,
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';
import { withStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

export default function OrganizerInfo(props) {
    const [trades, setTrades] = useState([]);
    const [stats, setStats] = useState([]);
    const [teams, setTeams] = useState([]);
    const [missionTimes, setMissionTimes] = useState([]);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/all_teams', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setTeams(response.data.teams);
            }
            else
            {
                console.log(response.data.message);
            }
        });
    },[props.token, teams])

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/team_stats', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setStats(response.data.stats);
            }
            else
            {
                console.log(response.data.message);
        }
        });
    },[props.token, stats])

    const handleSelect = (selected_team) => {
        const data = {
            team: selected_team
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }
    
        axios.post(process.env.REACT_APP_API_URL + '/team_trades', data, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setTrades(response.data.trades);
            }
            else
            {
                console.log(response.data.message);
            }
      });
    }

    const handleSelect2 = (selected_team) => {
        const data = {
            team: selected_team
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/get_missions', data, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                setMissionTimes(response.data.missions);
            }
            else
            {
                console.log(response.data.message);
            }
        });
    }

    const handleBack = () => {
        history.push('/organizer');
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
                        Visszalépés
                    </Typography>
                </ThemeProvider>
                </Toolbar>
            </AppBar>
            <div className={classes.info}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        Csapatok adatai
                    </Typography>
                </ThemeProvider>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Csapat</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/xp.png' alt='XP' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/point.png' alt='Pointok' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/max.png' alt='Napi pont' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/ifilogo.png' alt='Ifi pont' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/trade.png' alt='Cserék száma' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/shupp.png' alt='Shupp' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/omlas.png' alt='Omlás' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/porkolt.png' alt='Pörkölt' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/kaloz.png' alt='Kalóz' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/malna.png' alt='Málna' className={classes.table_icon}/>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            stats.map((team,i) => (
                                <>
                                    <StyledTableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            {team.team}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{team.xp}</StyledTableCell>
                                        <StyledTableCell align="center">{team.point}</StyledTableCell>
                                        <StyledTableCell align="center">{team.daily_point}</StyledTableCell>
                                        <StyledTableCell align="center">{team.ifipoint}</StyledTableCell>
                                        <StyledTableCell align="center">{team.trades}</StyledTableCell>
                                        <StyledTableCell align="center">{team.parts.shupp}</StyledTableCell>
                                        <StyledTableCell align="center">{team.parts.omlas}</StyledTableCell>
                                        <StyledTableCell align="center">{team.parts.porkolt}</StyledTableCell>
                                        <StyledTableCell align="center">{team.parts.kaloz}</StyledTableCell>
                                        <StyledTableCell align="center">{team.parts.malna}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.text}>
                        Csapatok cserélgetései
                    </Typography>
                </ThemeProvider>
                <div className={classes.box}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        p={1}
                        m={1}
                    >    
                        <Box p={1}>
                            <InputLabel htmlFor="team1"> Csapat kiválasztása</InputLabel>
                            <Select 
                                native 
                                required
                                fullWidth
                                variant="outlined"
                                name="team1"
                                id="team1"
                                onChange={ e => handleSelect(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                { 
                                    teams.map((team,i) => (
                                        <option key={i} value={team}>{team}</option>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </div>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Csapat</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/give.png' alt='Adás' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/get.png' alt='Kapás' className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src='./images/nr.png' alt='Szám' className={classes.table_icon}/>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            trades.map((trade,i) => (
                                <>
                                    <StyledTableRow key={i+1}>
                                        <StyledTableCell component="th" scope="row">
                                            {trade.team}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={`./images/${trade.give}.png`} alt='Adás' className={classes.table_icon}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={`./images/${trade.get}.png`} alt='Kapás' className={classes.table_icon}/>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{trade.nr}</StyledTableCell>
                                    </StyledTableRow>
                                </>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.text}>
                        Csapatok XP-s feladat idői
                    </Typography>
                </ThemeProvider>
                <div className={classes.box}>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        p={1}
                        m={1}
                    >    
                        <Box p={1}>
                            <InputLabel htmlFor="team2"> Csapat kiválasztása</InputLabel>
                            <Select 
                                native 
                                required
                                fullWidth
                                variant="outlined"
                                name="team2"
                                id="team2"
                                onChange={ e => handleSelect2(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                { 
                                    teams.map((team,i) => (
                                        <option key={i} value={team}>{team}</option>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </div>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <ThemeProvider theme={theme}>
                                        <Typography variant="h6">
                                            Sátoros XP időpontok
                                        </Typography>
                                    </ThemeProvider>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            missionTimes.map((mission,i) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell component="th" scope="row">
                                        {new Date(mission).toLocaleString()}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}