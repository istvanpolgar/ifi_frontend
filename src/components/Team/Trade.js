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
  InputLabel,
  Select
} from '@material-ui/core';

import PopupAlert from '../PopupAlert';
import OreCard from '../OreCard';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Trade(props) {
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [text, setText] = useState();

    const [xp, setXp] = useState(0);
    const [point, setPoint] = useState(0);
    const [dailyPoint, setDailyPoint] = useState(0);

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
                setDailyPoint(response.data.stats.daily_point);
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

        if(!team){
            setOpen(true);
            setText("Nem választottad ki, hogy melyik csapattal szeretnél cserélni!");
        }
        else
            if( (!ironTrade1 && !bronzeTrade1 && !silverTrade1 && !goldTrade1 && !diamondTrade1 && !ifiraldTrade1) || 
                (!ironTrade2 && !bronzeTrade2 && !silverTrade2 && !goldTrade2 && !diamondTrade2 && !ifiraldTrade2) ) {
                setOpen(true);
                setText("Üresen hagytad az ajánlott vagy a várt készletet!");
            }
            else
                if(ironTrade1 > iron || bronzeTrade1 > bronze || silverTrade1 > silver || goldTrade1 > gold || diamondTrade1 > diamond || ifiraldTrade1 > ifirald) {
                    setOpen(true);
                    setText("Nincs elég érced a cseréhez!");
                }
                else
                    if( ironTrade1 < 0 || bronzeTrade1 < 0 || silverTrade1 < 0 || goldTrade1 < 0 || diamondTrade1 < 0 || ifiraldTrade1 < 0 || 
                        ironTrade2 < 0 || bronzeTrade2 < 0 || silverTrade2 < 0 || goldTrade2 < 0 || diamondTrade2 < 0 || ifiraldTrade2 < 0){
                        setOpen(true);
                        setText("Negatív értéket adtál meg!");
                    }
                    else{
                        const data = {
                            pushed_ores: {
                                iron: ironTrade1,
                                bronze: bronzeTrade1,
                                silver: silverTrade1,
                                gold: goldTrade1,
                                diamond: diamondTrade1,
                                ifirald: ifiraldTrade1
                            },
                            waited_ores: {
                                iron: ironTrade2,
                                bronze: bronzeTrade2,
                                silver: silverTrade2,
                                gold: goldTrade2,
                                diamond: diamondTrade2,
                                ifirald: ifiraldTrade2
                            },
                            team: team,
                        }
                
                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${props.token}`
                        }
                
                        axios.post(process.env.REACT_APP_API_URL + '/trade', data, {headers: headers})
                            .then((response) => {
                            if(!response.data.code){
                                let pushed = "";
                                if(ironTrade1 > 0) pushed += ironTrade1 + " - vas, ";
                                if(bronzeTrade1 > 0) pushed += bronzeTrade1 + " - bronz, ";
                                if(silverTrade1 > 0) pushed += silverTrade1 + " - ezüst, ";
                                if(goldTrade1 > 0) pushed += goldTrade1 + " - arany, ";
                                if(diamondTrade1 > 0) pushed += diamondTrade1 + " - gyémánt, ";
                                if(ifiraldTrade1 > 0) pushed += ifiraldTrade1 + " - ifiráld, ";

                                pushed = pushed.slice(0, -2)

                                let waited = "";
                                if(ironTrade2 > 0) waited += ironTrade2 + " - vas, ";
                                if(bronzeTrade2 > 0) waited += bronzeTrade2 + " - bronz, ";
                                if(silverTrade2 > 0) waited += silverTrade2 + " - ezüst, ";
                                if(goldTrade2 > 0) waited += goldTrade2 + " - arany, ";
                                if(diamondTrade2 > 0) waited += diamondTrade2 + " - gyémánt, ";
                                if(ifiraldTrade2 > 0) waited += ifiraldTrade2 + " - ifiráld, ";

                                waited = waited.slice(0, -2)

                                setChange(!change);
                                setOpen(true);
                                setIronTrade1(0);
                                setBronzeTrade1(0);
                                setSilverTrade1(0);
                                setGoldTrade1(0);
                                setDiamondTrade1(0);
                                setIfiraldTrade1(0);
                                setIronTrade2(0);
                                setBronzeTrade2(0);
                                setSilverTrade2(0);
                                setGoldTrade2(0);
                                setDiamondTrade2(0);
                                setIfiraldTrade2(0);
                                setTeam("");
                                setText(`Sikeresen ajálatot tettetek: ${pushed}. A(z) ${team} csapattól a következőket kértétek: ${waited}!`);
                            }
                            else
                            {
                                setOpen(true);
                                setText(response.data.message);
                            }
                        });
                    }
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
                    <Box display="flex" >
                        <Box flexGrow={1} p={1}>
                            <Box 
                                display="flex"
                                alignItems="flex-start"
                            >
                                <Box p={1}>
                                <img alt="XPs" src="/images/xp.png" className={classes.bar}/>
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
                                <img alt="Poitns" src="/images/point.png" className={classes.bar}/>
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
                <div className={classes.box}>
                    <Box display="flex" justifyContent="center">
                        <Box p={1}>
                            <Box 
                                display="flex"
                                alignItems="center"
                            >
                                <Box p={1}>
                                <img alt="Napi pont" src="/images/dailypoint.png" className={classes.bar}/>
                                </Box>
                                <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        {dailyPoint}
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
                        Csere
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
                    <div className={classes.box}>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            justifyContent="center"
                            p={1}
                            m={1}
                        >    
                            <Box p={1}>
                                <InputLabel htmlFor="team"> Akivel cseréltek </InputLabel>
                                <Select 
                                    native 
                                    required
                                    fullWidth
                                    variant="outlined"
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
                    </div>
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