import { React, useState } from 'react';

import { 
  BrowserRouter as Router, 
  Switch,
  Route,
} from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgottenPass from './components/ForgottenPass';
import Team from './components/Team';
import Organizer from './components/Organizer';

function App() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signin">
              <SignIn 
                open={open}
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
          <Route path="/team">
              <Team />
          </Route>
          <Route path="/organizer">
              <Organizer />
          </Route>
          <Route path="/">
              <SignIn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
