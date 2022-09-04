import React from 'react';

import {
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from '@material-ui/core';

import { useStyles } from '../styles/teamAndOrganizerPagesStyle';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function OreCard(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.card}> 
                <CardActionArea>
                <CardMedia
                    className={classes.card_media}
                    image={props.src}
                    title={props.title}
                />
                <CardContent className={classes.card_content}>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h6" align='center'>
                            {props.title}
                        </Typography>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Typography variant="subtitle2" align='center'>
                            {props.ore} {props.scale}
                        </Typography>
                    </ThemeProvider>
                </CardContent>
                </CardActionArea>
            </Card>   
        </div>
    );
}