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
  CssBaseline
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
  const [team, setTeam] = useState("");
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
      team: team,
      xp: xp,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/addxp', data, {headers: headers})
      .then((response) => {
      if(!response.data.code){
        setOpen(true);
        setChange(!change);
        setTeam('');
        setXp(0);
        setText(`Sikeresen hozzáadtál a(z) ${team} csapatnak ${xp} XP-t!`);
      }
      else{
          setOpen(true);
          setText(response.data.message);
      }
    });
  }

  const handleTake = () => {
    const data = {
      team: team,
      xp: xp,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/takexp', data, {headers: headers})
      .then((response) => {
      if(!response.data.code){
        setOpen(true);
        setChange(!change);
        setTeam('');
        setXp(0);
        setText(`Sikeresen elvettél a(z) ${team} csapattól ${xp} XP-t!`);
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
          <div className={classes.paper}>
            <div className={classes.form}>
              <div className={classes.margin}>
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <TextField
                      id="xp"
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
                <Grid container spacing={2}>
                  <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                    <InputLabel htmlFor="team"> Csapat </InputLabel>
                    <Select 
                      native 
                      fullWidth
                      required
                      name="team"
                      id="team"
                      onChange={ e => setTeam(e.target.value)}
                    >
                      <option aria-label="None" value="" />
                      { 
                          teams.map((team,i) => (
                              <option key={i} value={team}>{team}</option>
                      ))}
                    </Select>
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