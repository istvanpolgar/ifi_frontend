import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Box,
  Avatar,
  InputLabel,
  Select
} from '@material-ui/core';

import PopupAlert from '../PopupAlert';
import OreCard from '../OreCard';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamPagesStyle';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Trade(props) {
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [text, setText] = useState();

    const [xp, setXp] = useState(0);
    const [point, setPoint] = useState(0);

    const [iron, setIron] = useState();
    const [bronze, setBronze] = useState();
    const [silver, setSilver] = useState();
    const [gold, setGold] = useState();
    const [diamond, setDiamond] = useState();
    const [ifirald, setIfirald] = useState();

    const [ironTrade1, setIronTrade1] = useState(0);
    const [bronzeTrade1, setBronzeTrade1] = useState(0);
    const [silverTrade1, setSilverTrade1] = useState(0);
    const [goldTrade1, setGoldTrade1] = useState(0);
    const [diamondTrade1, setDiamondTrade1] = useState(0);
    const [ifiraldTrade1, setIfiraldTrade1] = useState(0);

    const [ironTrade2, setIronTrade2] = useState(0);
    const [bronzeTrade2, setBronzeTrade2] = useState(0);
    const [silverTrade2, setSilverTrade2] = useState(0);
    const [goldTrade2, setGoldTrade2] = useState(0);
    const [diamondTrade2, setDiamondTrade2] = useState(0);
    const [ifiraldTrade2, setIfiraldTrade2] = useState(0);

    const [team, setTeam] = useState();
    const [teams, setTeams] = useState([]);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/get_teams', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                console.log(response.data.teams);
                setTeams(response.data.teams);
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
    },[props.token,change])

    const handleBack = () => {
        history.push('/team');
    }
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/shop', data, {headers: headers})
            .then((response) => {
            if(!response.data.code){
                
            }
            else
            {
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
                                    <Avatar alt="Points" src="/images/point.png" />
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
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        Csere - Ércek cserére ajánlása
                    </Typography>
                </ThemeProvider>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        p={1}
                        m={1}
                    >
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/iron.png' alt='Vasérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_iron1"
                                    onChange={e => setIronTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={ironTrade1}
                                    type="number"
                                    name="price_iron1"
                                    inputProps= {{ min:0, max: iron }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/bronze.png' alt='Bronzérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="nr_bronze1"
                                    onChange={e => setBronzeTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={bronzeTrade1}
                                    type="number"
                                    name="nr_bronze1"
                                    inputProps= {{ min:0, max: bronze }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/silver.png' alt='Ezüstérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_silver1"
                                    onChange={e => setSilverTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={silverTrade1}
                                    type="number"
                                    name="price_silver1"
                                    inputProps= {{ min:0, max: silver }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/gold.png' alt='Aranyérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_gold1"
                                    onChange={e => setGoldTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={goldTrade1}
                                    type="number"
                                    name="price_gold1"
                                    inputProps= {{ min:0, max: gold }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/diamond.png' alt='Gyémántérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_diamond1"
                                    onChange={e => setDiamondTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={diamondTrade1}
                                    type="number"
                                    name="price_diamond1"
                                    inputProps= {{ min:0, max: diamond }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/ifirald.png' alt='Ifiráldérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_ifirald1"
                                    onChange={e => setIfiraldTrade1(e.target.value)}
                                    label="Mennyiség"
                                    value={ifiraldTrade1}
                                    type="number"
                                    name="price_ifirald1"
                                    inputProps= {{ min:0, max: ifirald }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        p={1}
                        m={1}
                    >    
                        <Box p={1}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h6" className={classes.text}>
                                    Csapat
                                </Typography>
                            </ThemeProvider>
                        </Box>
                        <Box p={1}>
                            <InputLabel htmlFor="team"> Csapat </InputLabel>
                            <Select 
                                native 
                                required
                                fullWidth
                                name="team"
                                value={team}
                                id="team"
                                onChange={e => setTeam(e.target.value)}
                            >
                                <option aria-label="None" value="" />
                                { 
                                    teams.map((t,i) => (
                                        <option key={i} value={t}>{t}</option>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                    
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        p={1}
                        m={1}
                    >
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/iron.png' alt='Vasérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_iron2"
                                    onChange={e => setIronTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={ironTrade2}
                                    type="number"
                                    name="price_iron2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/bronze.png' alt='Bronzérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="nr_bronze2"
                                    onChange={e => setBronzeTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={bronzeTrade2}
                                    type="number"
                                    name="nr_bronze2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/silver.png' alt='Ezüstérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_silver2"
                                    onChange={e => setSilverTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={silverTrade2}
                                    type="number"
                                    name="price_silver2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/gold.png' alt='Aranyérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_gold2"
                                    onChange={e => setGoldTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={goldTrade2}
                                    type="number"
                                    name="price_gold2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/diamond.png' alt='Gyémántérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_diamond2"
                                    onChange={e => setDiamondTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={diamondTrade2}
                                    type="number"
                                    name="price_diamond2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/ifirald.png' alt='Ifiráldérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_ifirald2"
                                    onChange={e => setIfiraldTrade2(e.target.value)}
                                    label="Mennyiség"
                                    value={ifiraldTrade2}
                                    type="number"
                                    name="price_ifirald2"
                                    inputProps= {{ min:0, max: 100 }}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Csere
                    </Button>
                </form>
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