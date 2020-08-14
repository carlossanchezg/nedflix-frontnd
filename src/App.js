import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Contexts
import AuthContextProvider from './contexts/AuthContext';
import MovieContextProvider from './contexts/MovieIdContext';
import ListContextProvider from './contexts/ListIdContext';

// Misc
import Routes from './Routes';


function App() {
  return (
    <Fragment>
      <Router>
        <AuthContextProvider>
          <MovieContextProvider>
            <ListContextProvider>
              <Switch>
                { Routes }
              </Switch>
            </ListContextProvider>
          </MovieContextProvider>
        </AuthContextProvider>
      </Router>
    </Fragment>
  );
}

export default App;
