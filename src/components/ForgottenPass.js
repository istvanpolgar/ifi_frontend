import { React, useState } from 'react';
import axios from 'axios';

import Copyright from './Copyright';
import ErrorAlert from './ErrorAlert';

import {
  Paper,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Snackbar,
  Box,
  Link,
} from '@material-ui/core';

import { useStyles } from '../styles/signInUpStyle';
import { useHistory } from 'react-router-dom';

export default function Forgotten() {
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState();

  const classes = useStyles();
  const history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = () => {
    history.push('/signin ');
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const data = { email: email }

    axios.post(process.env.REACT_APP_API_URL + '/forgotten_pass', data)
    .then((response) => {
      if(response.data.code){
        setMessage(response.data.message);
        setOpen(true);
      }
      else
        history.push('/signin');
    })
  }

    return(
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid 
                item 
                xs={12} 
                sm={8} 
                md={5} 
                component={Paper} 
                elevation={6} 
                square>
                    <div className={classes.paper}>
                        <Typography 
                            component="h1" 
                            variant="h5"
                        >
                            Change password
                        </Typography>
                        <Typography 
                            component="p" 
                            color="primary"
                            className={classes.text}
                        >
                            To change the password, please enter the login e-mail address, click the button, 
                            and then wait for the necessary e-mail in your mailbox. You can enter a new password 
                            by clicking on the link in the letter!
                        </Typography>
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="E-mail address"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                                autoFocus
                            />
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <ErrorAlert onClose={handleClose} severity="error"> {message} </ErrorAlert>
                            </Snackbar>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Request a new password
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="" onClick={handleChange} variant="body2">
                                        Won't you replace it? SIGN IN!
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
            </Grid>
        </Grid>
)}