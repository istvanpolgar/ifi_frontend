import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { 
  AppBar,
  Fab, 
  IconButton,
  Toolbar, 
  Typography,
  TextField,
  InputLabel,
  Select,
  Grid,
  Container,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';
import { withStyles } from '@material-ui/core/styles';

import PopupAlert from '../PopupAlert';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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

export default function AddPoint(props) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [text, setText] = useState();

  const [point, setPoint] = useState(0);
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [teams, setTeams] = useState([]);
  const [otp, setOtp] = useState(0);
  const [points, setPoints] = useState([]);

  const classes = useStyles();
  const history = useHistory();

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

    axios.post(process.env.REACT_APP_API_URL + '/team_info', {}, {headers: headers})
    .then((response) => {
      if(!response.data.code){
        setPoints(response.data.points);
      }
      else
      {
        console.log(response.data.message);
      }
    });
  },[props.token,change])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleBack = () => {
    history.push('/organizer');
  }

  const handleAdd = () => {
    const data = {
      team: team1,
      point: point,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    if(!point) {
      setOpen(true);
      setText("Add meg az Pontot!");
    }
    else
      if(!team1) {
        setOpen(true);
        setText("Add meg az csapatot!");
      }
      else
        axios.post(process.env.REACT_APP_API_URL + '/addpoint', data, {headers: headers})
          .then((response) => {
          if(!response.data.code){
            setOpen(true);
            setChange(!change);
            setPoint(0);
            setText(`Sikeresen hozzáadtál a(z) ${team1} csapatnak ${point} pontot!`);
          }
          else{
              setOpen(true);
              setText(response.data.message);
          }
        });
  }

  const handleTake = () => {
    const data = {
      team: team1,
      point: point,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    if(!point) {
      setOpen(true);
      setText("Add meg az Pontot!");
    }
    else
      if(!team1) {
        setOpen(true);
        setText("Add meg az csapatot!");
      }
      else
        axios.post(process.env.REACT_APP_API_URL + '/takepoint', data, {headers: headers})
          .then((response) => {
          if(!response.data.code){
            setOpen(true);
            setChange(!change);
            setPoint(0);
            setText(`Sikeresen elvettél a(z) ${team1} csapattól ${point} pontot!`);
          }
          else{
              setOpen(true);
              setText(response.data.message);
          }
        });
  }

  const handlePoint = () => {
    const data = {
      team: team2,
      otp: otp,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }
    
    if(!otp) {
      setOpen(true);
      setText("Add meg a feladat pontszámát!");
    }
    else
      if(!team2) {
        setOpen(true);
        setText("Add meg az csapatot!");
      }
      else
        axios.post(process.env.REACT_APP_API_URL + '/ores_to_points', data, {headers: headers})
          .then((response) => {
          if(!response.data.code){
            setOpen(true);
            setChange(!change);
            setPoint(0);
            setText(`A(z) ${team2} csapatnak beváltottál egy ${otp} pontos feladatot!`);
          }
          else{
              setOpen(true);
              setText(response.data.message);
          }
        });
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
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <ThemeProvider theme={theme} className={classes.text}>
            <Typography variant="h5">
                Pont hozzáadása
            </Typography>
          </ThemeProvider>
          <div className={classes.paper}>
            <div className={classes.form}>
              <div className={classes.margin}>
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <InputLabel htmlFor="team1"> Csapat </InputLabel>
                    <Select 
                      native 
                      fullWidth
                      variant="outlined"
                      required
                      name="team1"
                      id="team1"
                      onChange={ e => setTeam1(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      { 
                          teams.map((team,i) => (
                              <option key={i} value={team}>{team}</option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <TextField
                        id="point"
                        fullWidth
                        variant="outlined"
                        onChange={e => setPoint(e.target.value)}
                        label="Pont"
                        value={point}
                        type="number"
                        name="point"
                        inputProps= {{ min:0, max: 10000 }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <Fab
                      component="button"
                      className={classes.submit}
                      onClick={handleAdd}
                      size="small"
                    >
                      <AddIcon /> 
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab
                      component="button"
                      className={classes.submit}
                      onClick={handleTake}
                      size="small"
                    >
                      <RemoveIcon /> 
                    </Fab>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <ThemeProvider theme={theme} className={classes.text}>
            <Typography variant="h5">
                Pontos feladat beváltása
            </Typography>
          </ThemeProvider>
          <div className={classes.paper}>
            <div className={classes.form}>
              <div className={classes.margin}>
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <InputLabel htmlFor="team2"> Csapat </InputLabel>
                    <Select 
                      native 
                      fullWidth
                      variant="outlined"
                      required
                      value={team2}
                      name="team2"
                      id="team2"
                      onChange={ e => setTeam2(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      { 
                          teams.map((team,i) => (
                              <option key={i} value={team}>{team}</option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <InputLabel htmlFor="points"> Feladat pontra </InputLabel>
                      <Select 
                        native 
                        fullWidth
                        variant="outlined"
                        required
                        value={otp}
                        name="point"
                        id="point"
                        onChange={ e => setOtp(e.target.value)}
                      >
                        <option aria-label="None" value="" />
                        <option key={1} value='100'>100</option>
                        <option key={2} value='200'>200</option>
                        <option key={3} value='300'>300</option>
                        <option key={4} value='400'>400</option>
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item>
                    <Fab
                      component="button"
                      className={classes.submit}
                      onClick={handlePoint}
                      size="small"
                    >
                      <AddIcon /> 
                    </Fab>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
        <ThemeProvider theme={theme}>
            <Typography variant="h3" className={classes.text}>
                Pontos feladatok árai
            </Typography>
        </ThemeProvider>
        <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell> 
                          <ThemeProvider theme={theme}>
                            <Typography variant="h6">
                              Pontok
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