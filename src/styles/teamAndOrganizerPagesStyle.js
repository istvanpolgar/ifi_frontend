import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '100vh',
    width: '100vw',
  },
  appbar: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '8vh',
    width: '100vw',
  },
  text: {
    margin: theme.spacing(3),
  },
  info: {
    paddingTop: '10vh',
  },
  card: {
    padding: theme.spacing(1),
    width: '15vh',
  },
  card_media: {
    width: '15vh',
    height: '15vh',
  },
  box: {
    width: '100%',
  },
  point: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  image: {
    width: '10vh',
    height: '10vh',
  },
  table: {
    minWidth: '50vh',
  },
  table_icon: {
    width: '6vh',
    height: '6vh',
  },
  input_icon: {
    width: '5vh',
    height: '5vh',
    marginRight: theme.spacing(3),
  },
  form: {
    width: '100vh', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));