import { React, useState } from 'react';

import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import useToken from './functions/useToken';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgottenPass from './components/ForgottenPass';
import Team from './components/Team';
import TeamInfo from './components/Team/TeamInfo';
import Shop from './components/Team/Shop';
import Trade from './components/Team/Trade';
import Organizer from './components/Organizer';

function App() {
  const [open, setOpen] = useState(false);
  const {token, setToken} = useToken();
  
  console.log('Token: ', token);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if(!token)
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/signin">
              <SignIn 
                open={open}
                setToken={setToken}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
              />
            </Route>
            <Route path="/signup">
                <SignUp setOpen={setOpen}/>
            </Route>
            <Route path="/forgotten_pass">
                <ForgottenPass />
            </Route>
            <Route path="/">
              <SignIn 
                open={open}
                setToken={setToken}
                handleClose={handleClose}
                handleClickOpen={handleClickOpen}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  else
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/team">
                <Team token={token} setToken={setToken}/>
            </Route>
            <Route path="/team_info">
                <TeamInfo token={token}/>
            </Route>
            <Route path="/shop">
                <Shop token={token}/>
            </Route>
            <Route path="/trade">
                <Trade token={token}/>
            </Route>
            <Route path="/organizer">
                <Organizer token={token}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
}

export default App;
