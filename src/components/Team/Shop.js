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
  Avatar
} from '@material-ui/core';

import PopupAlert from '../PopupAlert';
import OreCard from '../OreCard';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';
import { useStyles } from '../../styles/teamAndOrganizerPagesStyle';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Shop(props) {
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

    const [prices, setPrices] = useState({});

    const [ironBuy, setIronBuy] = useState(0);
    const [bronzeBuy, setBronzeBuy] = useState(0);
    const [silverBuy, setSilverBuy] = useState(0);
    const [goldBuy, setGoldBuy] = useState(0);
    const [diamondBuy, setDiamondBuy] = useState(0);
    const [ifiraldBuy, setIfiraldBuy] = useState(0);

    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/ore_prices', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code)
                setPrices(response.data.prices);
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

        let total_price = ironBuy*prices.iron + bronzeBuy*prices.bronze + silverBuy*prices.silver + goldBuy*prices.gold + diamondBuy*prices.diamond + ifiraldBuy*prices.ifirald;
        
        if(total_price === 0){
            setOpen(true);
            setText("Nem vettél semmit!");
        }
        else
            if(ironBuy < 0 || bronzeBuy < 0 || silverBuy < 0 || goldBuy < 0 || diamondBuy < 0 || ifiraldBuy < 0){
                setOpen(true);
                setText("Negatív értéket adtál meg!");
            }
            else
                if( total_price > xp){
                    setOpen(true);
                    setText("Több Ifi XP szükséges a vásárláshoz!");
                }
                else {
                    const data = {
                        price: total_price,
                        iron: ironBuy,
                        bronze: bronzeBuy,
                        silver: silverBuy,
                        gold: goldBuy,
                        diamond: diamondBuy,
                        ifirald: ifiraldBuy
                    }
            
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.token}`
                    }

                    axios.post(process.env.REACT_APP_API_URL + '/shop', data, {headers: headers})
                        .then((response) => {
                        if(!response.data.code){
                            let ores = "";
                            if(ironBuy > 0) ores += ironBuy + " - vas, ";
                            if(bronzeBuy > 0) ores += bronzeBuy + " - bronz, ";
                            if(silverBuy > 0) ores += silverBuy + " - ezüst, ";
                            if(goldBuy > 0) ores += goldBuy + " - arany, ";
                            if(diamondBuy > 0) ores += diamondBuy + " - gyémánt, ";
                            if(ifiraldBuy > 0) ores += ifiraldBuy + " - ifiráld, ";

                            ores = ores.slice(0, -2)

                            setChange(!change);
                            setOpen(true);
                            setIronBuy(0);
                            setBronzeBuy(0);
                            setSilverBuy(0);
                            setGoldBuy(0);
                            setDiamondBuy(0);
                            setIfiraldBuy(0);
                            setText(`Sikeresen megvásároltad a következő érceket: ${ores} és ez ${total_price} Ifi XP-be került!`);
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
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Vasérc" src="/images/iron.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {iron}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Bronzérc" src="/images/bronze.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {bronze}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Ezüstérc" src="/images/silver.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {silver}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Aranyérc" src="/images/gold.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {gold}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Gyémántérc" src="/images/diamond.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {diamond}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
                        </Box>
                    </Box>
                    <Box p={1} flexGrow={1}>
                        <Box 
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="center"
                        >
                            <Box p={1}>
                                <Avatar alt="Ifiráldérc" src="/images/ifirald.png" />
                            </Box>
                            <Box p={2}>
                                <ThemeProvider theme={theme}>
                                    <Typography variant="h5">
                                        - {ifirald}
                                    </Typography>
                                </ThemeProvider>
                            </Box>
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
                        <OreCard 
                            src='./images/iron.png'
                            title='Vas'
                            ore={prices.iron}
                            scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/bronze.png'
                            title='Bronz'
                            ore={prices.bronze}
                            scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/silver.png'
                            title='Ezüst'
                            ore={prices.silver}
                            scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/gold.png'
                            title='Arany'
                            ore={prices.gold}
                            scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/diamond.png'
                            title='Gyémánt'
                            ore={prices.diamond}
                            scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/ifirald.png'
                            title='Ifiráld'
                            ore={prices.ifirald}
                            scale='XP'
                        />
                    </Box>
                </Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        IFIbolt - Ércek vásárlása
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
                                    id="price_iron"
                                    onChange={e => setIronBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={ironBuy}
                                    type="number"
                                    name="price_iron"
                                    inputProps= {{ min:0, max:100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/bronze.png' alt='Bronzérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="nr_bronze"
                                    onChange={e => setBronzeBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={bronzeBuy}
                                    type="number"
                                    name="nr_bronze"
                                    inputProps= {{ min:0, max:100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/silver.png' alt='Ezüstérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_silver"
                                    onChange={e => setSilverBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={silverBuy}
                                    type="number"
                                    name="price_silver"
                                    inputProps= {{ min:0, max:100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/gold.png' alt='Aranyérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_gold"
                                    onChange={e => setGoldBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={goldBuy}
                                    type="number"
                                    name="price_gold"
                                    inputProps= {{ min:0, max:100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/diamond.png' alt='Gyémántérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_diamond"
                                    onChange={e => setDiamondBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={diamondBuy}
                                    type="number"
                                    name="price_diamond"
                                    inputProps= {{ min:0, max:100 }}
                                />
                            </Box>
                        </Box>
                        <Box p={1}>
                            <Box p={1}>
                                <img src='./images/ifirald.png' alt='Ifiráldérc' className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="price_ifirald"
                                    onChange={e => setIfiraldBuy(e.target.value)}
                                    label="Mennyiség"
                                    value={ifiraldBuy}
                                    type="number"
                                    name="price_ifirald"
                                    inputProps= {{ min:0, max:100 }}
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
                        Megveszem
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