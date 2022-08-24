import React, { useState } from 'react';
import axios from 'axios';

import Copyright from './Copyright';
import ErrorAlert from './ErrorAlert';

import {
    Paper,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Box,
    Grid,
    Typography,
    Snackbar,
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useStyles } from '../styles/signInUpStyle';
import { useHistory } from 'react-router-dom';

export default function SignUp(props) {
    const classes = useStyles();
    const history = useHistory();

    const [team, setTeam] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [message, setMessage] = useState();
    const [open, setOpen] = useState();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    const handleChange = () => {
        history.push('/signin');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            team: team,
            name: name,
            email: email,
            password: password,
            password2: password2
        }

        axios.post(process.env.REACT_APP_API_URL + '/signup', data)
        .then((response) => {
        if(response.data.code){
            setMessage(response.data.message);
            setOpen(true);
        }
        else
            props.setOpen(true);
            history.push('/signin');
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Regisztráció
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="team"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="team"
                                    label="Csapat neve"
                                    onChange={e => setTeam(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Csapatkapitány neve"
                                    onChange={e => setName(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="E-mail cím"
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Jelszó"
                                    type="password"
                                    id="password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password2"
                                    label="Jelszó újra"
                                    type="password"
                                    id="password2"
                                    onChange={e => setPassword2(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Regisztrálás
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="" onClick={handleChange} variant="body2">
                                    Már regisztráltál? Jelentkezz be!
                                </Link>
                            </Grid>
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