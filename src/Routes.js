import React from 'react';
import { Route } from 'react-router-dom';

// Views 
import LoginPage from './Components/FormsPages/LoginPage';
import RegisterPage from './Components/FormsPages/RegisterPage';

export default
 <React.Fragment>
     <Route 
     exact path="/"
     component={ LoginPage } />
     <Route 
     exact path="/register"
     component={ RegisterPage } />
 </React.Fragment>