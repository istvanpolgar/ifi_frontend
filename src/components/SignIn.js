import React, { useState } from 'react';
import axios from 'axios';

import Copyright from './Copyright';
import ErrorAlert from './ErrorAlert';
import PopupAlert from './PopupAlert';

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
    Snackbar,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useStyles } from '../styles/signInUpStyle';
import { useHistory } from 'react-router-dom';

export default function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  /*const handleChange = () => {
    history.push('/signup');
  }*/

  const handleChange2 = () => {
    history.push('/forgotten_pass');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${props.token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/signin', data, {headers: headers})
    .then((response) => {
      if(response.data.code){
        setMessage(response.data.message);
        setOpen(true);
      }
      else{
        props.setToken(response.data.token);
        history.push('/' + response.data.role);
      }
    })
  }

  return (
    <Grid container component="main" className={classes.root}>
      <PopupAlert 
        open={props.open}
        handleClose={props.handleClose}
        handleClickOpen={props.handleClickOpen}
        text="An email has been sent to the address provided. Please confirm the registration via the link in it!"
      />
      <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                SIGN IN
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="E-mail adress"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  SIGN IN
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="" onClick={handleChange2} variant="body2">
                      Change password
                    </Link>
                  </Grid>
                  {/*<Grid item>
                    <Link href="" onClick={handleChange} variant="body2">
                      Not registered yet? SIGN UP!
                    </Link>
                  </Grid>*/}
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <ErrorAlert onClose={handleClose} severity="error"> {message} </ErrorAlert>
                </Snackbar>
              </form>
            </div>
          </Grid>
    </Grid>
  );
}