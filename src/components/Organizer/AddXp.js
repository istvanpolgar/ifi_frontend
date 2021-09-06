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
  Button
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';

import PopupAlert from '../PopupAlert';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function AddXp(props) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [text, setText] = useState();

  const [xp, setXp] = useState(0);
  const [hourXp, setHourXp] = useState(0);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [teams, setTeams] = useState([]);

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

    axios.post(process.env.REACT_APP_API_URL + '/hour_xp', {}, {headers: headers})
        .then((response) => {
        if(!response.data.code){
            setHourXp(response.data.xp);
        }
        else
        {
            console.log(response.data.message);
        }
    });
  },[props.token])

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
      xp: xp,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    if(!xp) {
      setOpen(true);
      setText("Add meg az XP-t!");
    }
    else
      if(!team1) {
        setOpen(true);
        setText("Add meg az csapatot!");
      }
      else
        axios.post(process.env.REACT_APP_API_URL + '/addxp', data, {headers: headers})
          .then((response) => {
          if(!response.data.code){
            setOpen(true);
            setChange(!change);
            setXp(0);
            setText(`Sikeresen hozzáadtál a(z) ${team1} csapatnak ${xp} XP-t!`);
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
      xp: xp,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }
    if(!xp) {
      setOpen(true);
      setText("Add meg az XP-t!");
    }
    else
      if(!team1) {
        setOpen(true);
        setText("Add meg az csapatot!");
      }
      else
        axios.post(process.env.REACT_APP_API_URL + '/takexp', data, {headers: headers})
          .then((response) => {
          if(!response.data.code){
            setOpen(true);
            setChange(!change);
            setXp(0);
            setText(`Sikeresen elvettél a(z) ${team1} csapattól ${xp} XP-t!`);
          }
          else{
              setOpen(true);
              setText(response.data.message);
          }
        });
  }

  const handleWon = () => {
    const data = {
      team: team2
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }
    if(!team2) {
      setOpen(true);
      setText("Add meg az csapatot!");
    }
    else
      axios.post(process.env.REACT_APP_API_URL + '/xp_won', data, {headers: headers})
        .then((response) => {
        if(!response.data.code){
          setOpen(true);
          setChange(!change);
          setXp(0);
          setText(`A(z) ${team2} csapat teljestette a feladatot! ${hourXp} XP-t kapott!`);
        }
        else{
            setOpen(true);
            setText(response.data.message);
        }
      });
  }

  const handleLost = () => {
    const data = {
      team: team2
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }
    if(!team2) {
      setOpen(true);
      setText("Add meg az csapatot!");
    }
    else
      axios.post(process.env.REACT_APP_API_URL + '/xp_lost', data, {headers: headers})
        .then((response) => {
        if(!response.data.code){
          setOpen(true);
          setChange(!change);
          setXp(0);
          setText(`A(z) ${team2} csapat nem teljestette a feladatot! Nem kapott XP-t most!`);
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
          <ThemeProvider theme={theme}>
              <Typography variant="h5">
                  XP hozzáadás csapatokhoz
              </Typography>
          </ThemeProvider>
          <CssBaseline />
          <div className={classes.paper}>
            <div className={classes.form}>
              <div className={classes.margin}>
                <Grid container spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <InputLabel htmlFor="team1"> Csapat </InputLabel>
                      <Select 
                        native 
                        fullWidth
                        required
                        variant="outlined"
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
                  </Grid>
                  <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <TextField
                      id="xp"
                      variant="outlined"
                      fullWidth
                      onChange={e => setXp(e.target.value)}
                      label="XP"
                      value={xp}
                      type="number"
                      name="xp"
                      inputProps= {{ min:0, max: 10000 }}
                    />
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
          <ThemeProvider theme={theme}>
              <Typography variant="h5">
                  Feladatok XP-re
              </Typography>
          </ThemeProvider>
          <CssBaseline />
          <div className={classes.paper}>
            <div className={classes.form}>
              <div className={classes.margin}>
                <Grid container spacing={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <InputLabel htmlFor="team2"> Csapat </InputLabel>
                      <Select 
                        native 
                        fullWidth
                        required
                        variant="outlined"
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
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleWon}
                      >
                        XP-s feladat teljesítve
                      </Button>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleLost}
                      >
                        XP-s feladat elbukva
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </Container>
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