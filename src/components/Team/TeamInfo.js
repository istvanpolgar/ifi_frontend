import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Avatar
} from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamPagesStyle';

import OreCard from '../OreCard';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Team(props) {
  const [xp, setXp] = useState();
  const [point, setPoint] = useState();
  const [iron, setIron] = useState();
  const [bronze, setBronze] = useState();
  const [silver, setSilver] = useState();
  const [gold, setGold] = useState();
  const [diamond, setDiamond] = useState();
  const [ifirald, setIfirald] = useState();

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
  },[props.token,xp,iron,bronze,silver,gold,diamond,ifirald])

  const handleBack = (endpoint) => {
    history.push('/team');
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
      </div>
    </div>
  );
}