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
  const [priceIron, setPriceIron] = useState(0);
  const [priceBronze, setPriceBronze] = useState(0);
  const [priceSilver, setPriceSilver] = useState(0);
  const [priceGold, setPriceGold] = useState(0);
  const [priceDiamond, setPriceDiamond] = useState(0);
  const [priceIfirald, setPriceIfirald] = useState(0);
  const [houndred1, setHoundred1] = useState({
    iron: 0,
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
    ifirald: 0
  });
  const [houndred2, setHoundred2] = useState({
    iron: 0,
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
    ifirald: 0
  });
  const [houndred3, setHoundred3] = useState({
    iron: 0,
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
    ifirald: 0
  });
  const [houndred4, setHoundred4] = useState({
    iron: 0,
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
    ifirald: 0
  });

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
            setPriceIron(response.data.prices.iron);
            setPriceBronze(response.data.prices.bronze);
            setPriceSilver(response.data.prices.silver);
            setPriceGold(response.data.prices.gold);
            setPriceDiamond(response.data.prices.diamond);
            setPriceIfirald(response.data.prices.ifirald);
            setHoundred1(response.data.points.houndred1);
            setHoundred2(response.data.points.houndred2);
            setHoundred3(response.data.points.houndred3);
            setHoundred4(response.data.points.houndred4);
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

  const set100 = (e) => {
    e.preventDefault();
    setHoundred1({...houndred1, [e.target.name]: e.target.value});
  }

  const set200 = (e) => {
    e.preventDefault();
    setHoundred2({...houndred2, [e.target.name]: e.target.value});
  }

  const set300 = (e) => {
    e.preventDefault();
    setHoundred3({...houndred3, [e.target.name]: e.target.value});
  }

  const set400 = (e) => {
    e.preventDefault();
    setHoundred4({...houndred4, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      dailyPoint: dailyPoint,
      starterXp: starterXp,
      priceIron: priceIron,
      priceBronze: priceBronze,
      priceSilver: priceSilver,
      priceGold: priceGold,
      priceDiamond: priceDiamond,
      priceIfirald: priceIfirald,
      houndred1: houndred1,
      houndred2: houndred2,
      houndred3: houndred3,
      houndred4: houndred4,
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
                        <img src='./images/iron.png' alt='Vas ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_iron"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceIron(e.target.value)}
                            label="Vas ára"
                            value={priceIron}
                            type="number"
                            name="price_iron"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/bronze.png' alt='Bronz ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="bronze_iron"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceBronze(e.target.value)}
                            label="Bronz ára"
                            value={priceBronze}
                            type="number"
                            name="bronze_iron"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/silver.png' alt='Ezüst ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_silver"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceSilver(e.target.value)}
                            label="Ezüst ára"
                            value={priceSilver}
                            type="number"
                            name="price_silver"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/gold.png' alt='Arany ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_gold"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceGold(e.target.value)}
                            label="Arany ára"
                            value={priceGold}
                            type="number"
                            name="price_gold"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/diamond.png' alt='Gyémánt ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_diamond"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceDiamond(e.target.value)}
                            label="Gyémánt ára"
                            value={priceDiamond}
                            type="number"
                            name="price_diamond"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/ifirald.png' alt='Ifiráld ára' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_ifirald"
                            fullWidth
                            variant="outlined"
                            onChange={e => setPriceIfirald(e.target.value)}
                            label="Ifiráld ára"
                            value={priceIfirald}
                            type="number"
                            name="price_ifirald"
                            inputProps= {{ min:0, max: 1000 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <img src='./images/dailypoint.png' alt='Napi pont' className={classes.input_icon}/>
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
                      <Grid item >
                        <img src='./images/100.png' alt='100 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="iron"
                            onChange={set100}
                            label="Vas"
                            value={houndred1.iron}
                            type="number"
                            name="iron"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="bronze"
                            onChange={set100}
                            label="Bronz"
                            value={houndred1.bronze}
                            type="number"
                            name="bronze"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="silver"
                            onChange={set100}
                            label="Ezüst"
                            value={houndred1.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            onChange={set100}
                            label="arany"
                            value={houndred1.gold}
                            type="number"
                            name="gold"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="diamond"
                            onChange={set100}
                            label="Gyémánt"
                            value={houndred1.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            onChange={set100}
                            label="Ifiráld"
                            value={houndred1.ifirald}
                            type="number"
                            name="ifirald"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <img src='./images/200.png' alt='200 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="iron"
                            onChange={set200}
                            label="Vas"
                            value={houndred2.iron}
                            type="number"
                            name="iron"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="bronze"
                            onChange={set200}
                            label="Bronz"
                            value={houndred2.bronze}
                            type="number"
                            name="bronze"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="silver"
                            onChange={set200}
                            label="Ezüst"
                            value={houndred2.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            onChange={set200}
                            label="arany"
                            value={houndred2.gold}
                            type="number"
                            name="gold"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="diamond"
                            onChange={set200}
                            label="Gyémánt"
                            value={houndred2.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            onChange={set200}
                            label="Ifiráld"
                            value={houndred2.ifirald}
                            type="number"
                            name="ifirald"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <img src='./images/300.png' alt='300 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="iron"
                            onChange={set300}
                            label="Vas"
                            value={houndred3.iron}
                            type="number"
                            name="iron"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="bronze"
                            onChange={set300}
                            label="Bronz"
                            value={houndred3.bronze}
                            type="number"
                            name="bronze"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="silver"
                            onChange={set300}
                            label="Ezüst"
                            value={houndred3.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            onChange={set300}
                            label="arany"
                            value={houndred3.gold}
                            type="number"
                            name="gold"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="diamond"
                            onChange={set300}
                            label="Gyémánt"
                            value={houndred3.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            onChange={set300}
                            label="Ifiráld"
                            value={houndred3.ifirald}
                            type="number"
                            name="ifirald"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <img src='./images/400.png' alt='400 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="iron"
                            onChange={set400}
                            label="Vas"
                            value={houndred4.iron}
                            type="number"
                            name="iron"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="bronze"
                            onChange={set400}
                            label="Bronz"
                            value={houndred4.bronze}
                            type="number"
                            name="bronze"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="silver"
                            onChange={set400}
                            label="Ezüst"
                            value={houndred4.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            onChange={set400}
                            label="arany"
                            value={houndred4.gold}
                            type="number"
                            name="gold"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="diamond"
                            onChange={set400}
                            label="Gyémánt"
                            value={houndred4.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            onChange={set400}
                            label="Ifiráld"
                            value={houndred4.ifirald}
                            type="number"
                            name="ifirald"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                    </Grid>
                  </div>
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