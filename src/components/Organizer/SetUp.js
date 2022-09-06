import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';

import PopupAlert from '../PopupAlert';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function SetUp(props) {
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [text, setText] = useState();

  const [dailyPoint, setDailyPoint] = useState(0);
  const [starterXp, setStarterXp] = useState(0);
  const [hourXp, setHourXp] = useState(0);
  const [pricePart, setPricePart] = useState(0);
  const [houndred1, setHoundred1] = useState(0);
  const [houndred2, setHoundred2] = useState(0);
  const [houndred3, setHoundred3] = useState(0);
  const [houndred4, setHoundred4] = useState(0);
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [teams, setTeams] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  useEffect(()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/get_settings', {}, {headers: headers})
        .then((response) => {
        if(!response.data.code){
            setDailyPoint(response.data.dp);
            setStarterXp(response.data.xp);
            setHourXp(response.data.hxp);
            setPricePart(response.data.price);
            setHoundred1(response.data.prices.houndred1);
            setHoundred2(response.data.prices.houndred2);
            setHoundred3(response.data.prices.houndred3);
            setHoundred4(response.data.prices.houndred4);
            setParts(response.data.parts);
            setSelectedParts(response.data.selected_parts);
        }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      starterXp: starterXp,
      pricePart: pricePart,
      dailyPoint: dailyPoint,
      hourXp: hourXp,
      houndred1: houndred1,
      houndred2: houndred2,
      houndred3: houndred3,
      houndred4: houndred4,
      parts: selectedParts
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/setup', data, {headers: headers})
      .then((response) => {
      if(!response.data.code){
        setOpen(true);
        setChange(!change);
        setText("Az adatok sikeresen frisstve lettek!");
      }
      else{
          setOpen(true);
          setText(response.data.message);
      }
    });
  }

  const handleAdd = (part,i,t) => {
    let newParts = [];
    selectedParts.forEach((parts,j) => {
      if(parts.team === t)
        newParts.push({
          'team': parts.team,
          'part': part
        })
      else
        newParts.push({
          'team': parts.team,
          'part': parts.part
        })
    })
    setSelectedParts(newParts);
  }
 
  const getPart = (team) => {
    let part = '';
    selectedParts.forEach((parts) => {
      if(team === parts.team)
        part = parts.part;
    })
    return part;
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
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/xp.png' alt='XP' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                          id="starter_xp"
                          fullWidth
                          variant="outlined"
                          onChange={e => setStarterXp(e.target.value)}
                          label="Csapatok kezdeti XP-je"
                          value={starterXp}
                          type="number"
                          name="starter_xp"
                          inputProps= {{ min:0, max: 10000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/malna.png' alt='Darab ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_part"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPricePart(e.target.value)}
                            label="Darab ára"
                            value={pricePart}
                            type="number"
                            name="price_part"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/max.png' alt='Napi pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="daily_points"
                            fullWidth
                            variant="outlined"
                            onChange={e => setDailyPoint(e.target.value)}
                            label="Napi beváltható pontszám"
                            value={dailyPoint}
                            type="number"
                            name="daily_points"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/hourxp.png' alt='Óránkénti XP' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="hour_xp"
                            fullWidth
                            variant="outlined"
                            onChange={e => setHourXp(e.target.value)}
                            label="Óránkénti XP"
                            value={hourXp}
                            type="number"
                            name="hour_xp"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/100.png' alt='100 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="pont100"
                            fullWidth
                            variant="outlined"
                            onChange={e => setHoundred1(e.target.value)}
                            label="100 pontos feladat értéke"
                            value={houndred1}
                            type="number"
                            name="pont100"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/200.png' alt='200 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="pont200"
                            fullWidth
                            variant="outlined"
                            onChange={e => setHoundred2(e.target.value)}
                            label="200 pontos feladat értéke"
                            value={houndred2}
                            type="number"
                            name="pont200"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/300.png' alt='300 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="pont300"
                            fullWidth
                            variant="outlined"
                            onChange={e => setHoundred3(e.target.value)}
                            label="300 pontos feladat értéke"
                            value={houndred3}
                            type="number"
                            name="pont300"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/400.png' alt='400 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="pont400"
                            fullWidth
                            variant="outlined"
                            onChange={e => setHoundred4(e.target.value)}
                            label="400 pontos feladat értéke"
                            value={houndred4}
                            type="number"
                            name="pont400"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {
                    teams.map((team,i) => (                    
                      <div className={classes.margin} key={i}>
                        <Grid container spacing={1} alignItems="flex-end">
                          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <InputLabel htmlFor="team"> {team} csapat Ifidarbkája</InputLabel>
                            <Select 
                              native 
                              fullWidth
                              variant="outlined"
                              required
                              value={getPart(team)}
                              name={team}
                              id="team"
                              onChange={ e => handleAdd(e.target.value, i, team)}
                            >
                              <option aria-label="None" value="" />
                              { 
                                  parts.map((part,i) => (
                                      <option key={i} value={part}>{part}</option>
                              ))}
                            </Select>
                          </Grid>
                        </Grid>
                      </div>
                  ))}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Adatok beállítása
                  </Button>
                </form>
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