import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';
import { withStyles } from '@material-ui/core/styles';

import PopupAlert from '../PopupAlert';
import OreCard from '../OreCard';

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

export default function TeamInfo(props) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [text, setText] = useState();
  
  const [xp, setXp] = useState(0);
  const [point, setPoint] = useState(0);
  const [dailyPoint, setDailyPoint] = useState(0);
  const [iron, setIron] = useState(0);
  const [bronze, setBronze] = useState(0);
  const [silver, setSilver] = useState(0);
  const [gold, setGold] = useState(0);
  const [diamond, setDiamond] = useState(0);
  const [ifirald, setIfirald] = useState(0);

  const [trades, setTrades] = useState([]);
  const [points, setPoints] = useState([]);

  const history = useHistory();
  const classes = useStyles();

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
        setPoints(response.data.points);
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

    axios.post(process.env.REACT_APP_API_URL + '/trades2', {}, {headers: headers})
        .then((response) => {
        if(!response.data.code){
            setTrades(response.data.trades);
        }
        else
        {
            console.log(response.data.message);
        }
  });
  },[props.token, change])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleBack = () => {
    history.push('/team');
  }

  const handleRefuze = (trade) => {
    console.log(trade);
    const data = {
        trade: trade
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/refuze_trade2', data, {headers: headers})
        .then((response) => {
        if(!response.data.code){
            setChange(!change);
            setOpen(true);
            setText(`Visszavont??tok az aj??nlatot a(z) ${response.data.team} csapatt??l!`);
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
                Visszal??p??s
            </Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <div className={classes.info}>
        <div className={classes.box}>
          <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
              <Box 
                display="flex"
                alignItems="flex-start"
              >
                <Box p={1}>
                  <Avatar alt="XPs" src="/images/xp.png" />
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
            <Box p={1} flexGrow={1}>
              <Box 
                display="flex"
                alignItems="flex-start"
              >
                <Box p={2}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h5">
                        Marad??k napi pont: {dailyPoint}
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
                  <Avatar alt="Poitns" src="/images/point.png" />
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
              title='Ez??st'
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
              title='Gy??m??nt'
              ore={diamond}
              scale='darab'
            />
          </Box>
          <Box p={1}>
            <OreCard 
              src='./images/ifirald.png'
              title='Ifir??ld'
              ore={ifirald}
              scale='darab'
            />
          </Box>
        </Box>

        <ThemeProvider theme={theme}>
            <Typography variant="h3" className={classes.text}>
                Pontos feladatok ??rai
            </Typography>
        </ThemeProvider>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell> Pont </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/iron.png' alt='Vas' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/bronze.png' alt='Bronz' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/silver.png' alt='Ez??st' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/gold.png' alt='Arany' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/diamond.png' alt='Gy??m??nt' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/ifirald.png' alt='Ifir??ld' className={classes.table_icon}/>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    points.map((point,i) => (
                        <>
                            <StyledTableRow key={i}>
                                <StyledTableCell component="th" scope="row">
                                  <img src={'./images/' + (i+1)*100 + '.png'} alt={(i+1)*100 + ' pont'} className={classes.table_icon}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">{point.iron}</StyledTableCell>
                                <StyledTableCell align="center">{point.bronze}</StyledTableCell>
                                <StyledTableCell align="center">{point.silver}</StyledTableCell>
                                <StyledTableCell align="center">{point.gold}</StyledTableCell>
                                <StyledTableCell align="center">{point.diamond}</StyledTableCell>
                                <StyledTableCell align="center">{point.ifirald}</StyledTableCell>
                            </StyledTableRow>
                        </>
                    ))
                }
                </TableBody>
            </Table>
        </TableContainer>

        <ThemeProvider theme={theme}>
            <Typography variant="h3" className={classes.text}>
                A csapat aj??nlatainak list??ja
            </Typography>
        </ThemeProvider>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Csapat</StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/iron.png' alt='Vas' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/bronze.png' alt='Bronz' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/silver.png' alt='Ez??st' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/gold.png' alt='Arany' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/diamond.png' alt='Gy??m??nt' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <img src='./images/ifirald.png' alt='Ifir??ld' className={classes.table_icon}/>
                        </StyledTableCell>
                        <StyledTableCell align="center"> Visszavon??s </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    trades.map((trade,i) => (
                        <>
                            <StyledTableRow key={i+1}>
                                <StyledTableCell component="th" scope="row">
                                    Aj??nlat a(z) {trade.team} csapatnak
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
                                      onClick={() => {handleRefuze(trade)}}
                                      size="small"
                                  >
                                      <CloseIcon /> 
                                  </Fab>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={(i+1)*10+i}>
                                <StyledTableCell component="th" scope="row">
                                  K??r??s a(z) {trade.team} csapatt??l
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