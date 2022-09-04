import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  TextField,
  Box
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
    const [ifipoint, setIfipoint] = useState(0);
    const [shupp, setShupp] = useState(0);
    const [omlas, setOmlas] = useState(0);
    const [porkolt, setPorkolt] = useState(0);
    const [kaloz, setKaloz] = useState(0);
    const [malna, setMalna] = useState(0);
    const [part, setPart] = useState("");

    const [buy, setBuy] = useState(0);

    const [price, setPrice] = useState(0);

    const history = useHistory();
    const classes = useStyles();
    let partName = "";

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.token}`
        }

        axios.post(process.env.REACT_APP_API_URL + '/part_price', {}, {headers: headers})
            .then((response) => {
            if(!response.data.code)
                setPrice(response.data.price);
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
                setIfipoint(response.data.stats.ifipoint);
                setShupp(response.data.stats.parts.shupp);
                setOmlas(response.data.stats.parts.omlas);
                setPorkolt(response.data.stats.parts.porkolt);
                setKaloz(response.data.stats.parts.kaloz);
                setMalna(response.data.stats.parts.malna);
                setPart(response.data.stats.part);
            }
            else
            {
                console.log(response.data.message);
        }
        });
    },[props.token,change,shupp,omlas,porkolt,kaloz,malna])

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
        
        let total_price = buy*price;

        if(total_price === 0){
            setOpen(true);
            setText("You didn't buy anything!");
        }
        else
            if(buy < 0){
                setOpen(true);
                setText("You entered a negative value!");
            }
            else
                if( total_price > xp){
                    setOpen(true);
                    setText("You need more XP to buy!");
                }
                else {
                    const data = {
                        price: total_price,
                        buy: buy,
                        part: part
                    }
            
                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.token}`
                    }

                    axios.post(process.env.REACT_APP_API_URL + '/shop', data, {headers: headers})
                        .then((response) => {
                        if(!response.data.code){
                            setChange(!change);
                            setOpen(true);
                            setPart("");
                            setText(`You have successfully purchased ${buy} ${part}, so you have spent ${total_price} XP!`);
                        }
                        else
                        {
                            setOpen(true);
                            setText(response.data.message);
                        }
                    });
                }
    }

    switch(part) {
        case 'shupp': partName = "Shupp"; break;
        case 'omlas': partName = "Omlás"; break;
        case 'porkolt': partName = "Pörkölt"; break;
        case 'kaloz': partName = "Kalóz"; break;
        case 'malna': partName = "Málna"; break;
        default: partName = "Unknow";
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
                        Back
                    </Typography>
                </ThemeProvider>
                </Toolbar>
            </AppBar>
            <div className={classes.info}>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    p={1}
                    m={1}
                >
                    <Box p={1}>
                        <OreCard 
                        src='./images/xp.png'
                        title='XP'
                        ore={xp}
                        scale='XP'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                        src='./images/ifilogo.png'
                        title='Ifipoint'
                        ore={ifipoint}
                        scale='point'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src={`./images/${part}.png`}
                            title={`${partName}`}
                            ore={price}
                            scale='XP'
                        />
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
                            src='./images/shupp.png'
                            title='Shupp'
                            ore={shupp}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/omlas.png'
                            title='Omlás'
                            ore={omlas}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/porkolt.png'
                            title='Pörkölt'
                            ore={porkolt}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/kaloz.png'
                            title='Kalóz'
                            ore={kaloz}
                            scale='piece'
                        />
                    </Box>
                    <Box p={1}>
                        <OreCard 
                            src='./images/malna.png'
                            title='Málna'
                            ore={malna}
                            scale='piece'
                        />
                    </Box>
                </Box>
                <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                        Buy from the current piece of your team
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
                                <img src={`./images/${part}.png`} alt={`${part}`} className={classes.image}/>
                            </Box>  
                            <Box p={1}>
                                <TextField
                                    id="buy"
                                    onChange={e => setBuy(e.target.value)}
                                    label="Quantity"
                                    value={buy}
                                    type="number"
                                    name="buy"
                                    inputProps= {{ min:0, max:100 }}
                                    className={classes.input}
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
                        I will buy it
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