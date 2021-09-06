import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
import Offers from './components/Team/Offers';

import Organizer from './components/Organizer';
import OrganizerInfo from './components/Organizer/OrganizerInfo';
import SetUp from './components/Organizer/SetUp';
import AddXp from './components/Organizer/AddXp';
import AddPoint from './components/Organizer/AddPoint';

function App() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState();
  const {token, setToken} = useToken();

  useEffect( () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }

    axios.post(process.env.REACT_APP_API_URL + '/role', {}, {headers: headers})
    .then((response) => { setRole(response.data.role); })
  },[token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('Token: ', token);
  console.log('Role: ', role);

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
    if (role === "organizer")
      return (
        <div>
          <Router>
            <Switch>
              <Route path="/organizer">
                  <Organizer token={token} setToken={setToken}/>
              </Route>
              <Route path="/setup">
                  <SetUp token={token}/>
              </Route>
              <Route path="/organizer_info">
                  <OrganizerInfo token={token}/>
              </Route>
              <Route path="/add_xp">
                  <AddXp token={token}/>
              </Route>
              <Route path="/add_point">
                  <AddPoint token={token}/>
              </Route>
            </Switch>
          </Router>
        </div>
      );
    else
        if (role === "team")
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
                  <Route path="/offers">
                      <Offers token={token}/>
                  </Route>
                </Switch>
              </Router>
            </div>
          );
        else
          return (
            <div></div>
          );
}

export default App;
