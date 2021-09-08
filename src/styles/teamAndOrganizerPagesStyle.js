import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '100vh',
    width: '100%',
  },
  appbar: {
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '8vh',
    width: '100%',
  },
  text: {
    margin: theme.spacing(3),
  },
  info: {
    paddingTop: '10vh',
    paddingBottom: '5vh',
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
  container: {
    width: '95%',
    margin: 'auto',
  },
  table: {
    width: '100%',
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
  bar: {
    width: '5vh',
    height: '5vh',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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