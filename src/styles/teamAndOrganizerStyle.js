import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0),
    margin: theme.spacing(0),
    height: '100vh',
    width: '100vw',
  },
  grid: {
    paddingTop: '8vh',
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
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  },
  avatar: {
    margin: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  text: {
    margin: theme.spacing(3),
  }
}));