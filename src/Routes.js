import React from 'react';
import { Route } from 'react-router-dom';

// Views 
import LoginPage from './Components/FormsPages/LoginPage';
import RegisterPage from './Components/FormsPages/RegisterPage';
import Home from './Components/Home/Home';
import Logout from './Components/Logout/Logout'; 
import MovieInfo from './Components/MovieInfo/MovieInfo';
import SimilarMovie from './Components/SimilarMovie/SimilarMovie';
import WatchMovie from './Components/WatchMovie/WatchMovie';
import WatchTrailer from './Components/WatchTrailer/WatchTrailer';
import UserLists from './Components/UserLists/UserLists';
import Search from './Components/Search';

export default
 <React.Fragment>
     <Route 
     exact path="/"
     component={ LoginPage } />
     <Route 
     exact path="/register"
     component={ RegisterPage } />
     <Route 
     exact path="/home" 
     component={ Home } />
     <Route 
     exact path="/logout" 
     component={ Logout } />
     <Route 
     exact path="/movie"
     component={ MovieInfo } />
     <Route
     exact path="/similar-movie"
     component={ SimilarMovie } />
     <Route
     exact path="/watch-movie"
     component={ WatchMovie } />
     <Route
     exact path="/watch-trailer"
     component={ WatchTrailer } />
     <Route
     exact path="/my-lists"
     component={ UserLists } />
     <Route
     exact path="/search"
     component={ Search } />
 </React.Fragment>