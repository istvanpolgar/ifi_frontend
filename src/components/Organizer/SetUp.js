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
                Visszal??p??s
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
                      <Grid item>
                        <img src='./images/xp.png' alt='XP' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                          id="starter_xp"
                          fullWidth
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
                      <Grid item>
                        <img src='./images/iron.png' alt='Vas ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_iron"
                            fullWidth
                            onChange={e => setPriceIron(e.target.value)}
                            label="Vas ??ra"
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
                      <Grid item>
                        <img src='./images/bronze.png' alt='Bronz ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="bronze_iron"
                            fullWidth
                            onChange={e => setPriceBronze(e.target.value)}
                            label="Bronz ??ra"
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
                      <Grid item>
                        <img src='./images/silver.png' alt='Ez??st ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_silver"
                            fullWidth
                            onChange={e => setPriceSilver(e.target.value)}
                            label="Ez??st ??ra"
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
                      <Grid item>
                        <img src='./images/gold.png' alt='Arany ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_gold"
                            fullWidth
                            onChange={e => setPriceGold(e.target.value)}
                            label="Arany ??ra"
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
                      <Grid item>
                        <img src='./images/diamond.png' alt='Gy??m??nt ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_diamond"
                            fullWidth
                            onChange={e => setPriceDiamond(e.target.value)}
                            label="Gy??m??nt ??ra"
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
                      <Grid item>
                        <img src='./images/ifirald.png' alt='Ifir??ld ??ra' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="price_ifirald"
                            fullWidth
                            onChange={e => setPriceIfirald(e.target.value)}
                            label="Ifir??ld ??ra"
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
                      <Grid item>
                        <img src='./images/dailypoint.png' alt='Napi pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <TextField
                            id="daily_points"
                            fullWidth
                            onChange={e => setDailyPoint(e.target.value)}
                            label="Napi bev??lthat?? pontsz??m"
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
                      <Grid item>
                        <img src='./images/100.png' alt='100 pont' className={classes.input_icon}/>
                      </Grid>
                      <Grid item>
                        <TextField
                            id="iron"
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                            onChange={set100}
                            label="Ez??st"
                            value={houndred1.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            fullWidth
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
                            fullWidth
                            onChange={set100}
                            label="Gy??m??nt"
                            value={houndred1.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            fullWidth
                            onChange={set100}
                            label="Ifir??ld"
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                            onChange={set200}
                            label="Ez??st"
                            value={houndred2.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            fullWidth
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
                            fullWidth
                            onChange={set200}
                            label="Gy??m??nt"
                            value={houndred2.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            fullWidth
                            onChange={set200}
                            label="Ifir??ld"
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                            onChange={set300}
                            label="Ez??st"
                            value={houndred3.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            fullWidth
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
                            fullWidth
                            onChange={set300}
                            label="Gy??m??nt"
                            value={houndred3.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            fullWidth
                            onChange={set300}
                            label="Ifir??ld"
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
                            fullWidth
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
                            fullWidth
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
                            fullWidth
                            onChange={set400}
                            label="Ez??st"
                            value={houndred4.silver}
                            type="number"
                            name="silver"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="gold"
                            fullWidth
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
                            fullWidth
                            onChange={set400}
                            label="Gy??m??nt"
                            value={houndred4.diamond}
                            type="number"
                            name="diamond"
                            inputProps= {{ min:0, max: 10 }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            id="ifirald"
                            fullWidth
                            onChange={set400}
                            label="Ifir??ld"
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
                  Adatok be??ll??t??sa
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