import React from 'react';
import axios from 'axios';

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Link,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../styles/teamAndOrganizerStyle';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Team(props) {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = (endpoint) => {
    history.push(endpoint);
  }

  const handleExit = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/logout', {}, {headers: headers})
    .then((response) => {
      if(response.data.status){
          props.setToken('');
          history.push('/');
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
            onClick={handleExit}
          >
            <ExitToAppIcon />
          </IconButton>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" className={classes.text}>
                LOG OUT
            </Typography>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Grid 
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        className={classes.grid}
      >
        <Grid 
          container 
          item 
          xs={12} sm={12} md={12} lg={12} xl={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
           <Link href="" onClick={() => handleSubmit('/team_info')}>
              <Paper className={classes.paper} variant="outlined" square>
                <Avatar className={classes.avatar}>
                    <InfoIcon className={classes.icon}/>
                </Avatar>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" className={classes.text}>
                      Information
                  </Typography>
                </ThemeProvider>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Link href="" onClick={() => handleSubmit('/shop')}>
              <Paper className={classes.paper} variant="outlined" square>
                <Avatar className={classes.avatar}>
                    <ShoppingCartIcon className={classes.icon} />
                </Avatar>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" className={classes.text}>
                      Shop
                  </Typography>
                </ThemeProvider>
              </Paper>
            </Link>
          </Grid>
        </Grid>
        <Grid
          container 
          item 
          xs={12} sm={12} md={12} 
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Link href="" onClick={() => handleSubmit('/trade')}>
              <Paper className={classes.paper} variant="outlined" square>
                <Avatar className={classes.avatar}>
                    <CompareArrowsIcon className={classes.icon}/>
                </Avatar>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" className={classes.text}>
                    Exchange
                  </Typography>
                </ThemeProvider>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Link href="" onClick={() => handleSubmit('/offers')}>
              <Paper className={classes.paper} variant="outlined" square>
                <Avatar className={classes.avatar}>
                    <LocalOfferIcon className={classes.icon}/>
                </Avatar>
                <ThemeProvider theme={theme}>
                  <Typography variant="h5" className={classes.text}>
                      Offers
                  </Typography>
                </ThemeProvider>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}