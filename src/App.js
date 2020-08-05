import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from './Routes';
function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          { Routes }
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
