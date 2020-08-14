/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { MovieContext } from '../../contexts/MovieIdContext';
import { 
  CardLink, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import axios from 'axios';
import './Home.css';
import Banner from '../Banner';
import Footer from '../Footer/Footer';
import Error from '../Errors';

const Home = () => {
  
    const { isAuth } = useContext(AuthContext);
 
    const HomeAuth = () => {

      const { setMovieIdInLocalStorage } = useContext(MovieContext);
      const[movies, setMovies] = useState([]);
      const[error, setError] = useState('');

      const[movie, setMovie] = useState({});

      useEffect(() => {
        const getBannerMovie = async () => {
          const MOVIES_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/movies`;

          try {
            const request = await axios.get(MOVIES_URI, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
  
            setMovie(request.data[Math.floor(Math.random() * request.data.length - 1)]
            );
            return request;
          } catch (error) {
            alert('Error get banner movie');
          }
        }
        getBannerMovie();
      }, []);

      useEffect(() => {
        async function getMovies() {
          const MOVIES_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/movies`;

          try {
            const moviesRes = await axios.get(MOVIES_URI, {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            setMovies(moviesRes.data);
            return moviesRes
          } catch (error) {
            setError('Error in get movies');
          }
        }
        getMovies();
      }, []);

      const foundMovies = movies.map((movie) => movie);
      const nedflixOriginals = movies.filter((movies) => movies.nedflix_originals === true);
      const trending = movies.filter((movies) => movies.trending_movie === true);
      const programms = movies.filter((movies) => movies.nedflix_originals === false && movies.year !== 2020);
      const comingsoon = movies.filter((movies) => movies.year === 2020);

      return ( 
        <div className="body" >
          <NavigationBar />
          <div>
            <Banner movieIdBanner={movie} /> 
            <h3 className="text-white pl-3" >Originales de Nedflix</h3>
            <div className="row_covers mb-4" >
              {
              nedflixOriginals.map(movie => (
                <div>
                   <CardLink tag={Link} to="/movie" >
                    <img onClick={() => setMovieIdInLocalStorage(movie._id)} src={ movie.large_cover } alt={ movie.title } className="row_large_cover" />
                   </CardLink>
                </div>
              ))
              }
            </div>
            <h3 className="text-white pl-3" >Tendencias</h3>
            <div className="row_covers" >
              {
              trending.map(movie => (
                <div>
                   <CardLink tag={Link} to="/movie" >
                    <img onClick={() => setMovieIdInLocalStorage(movie._id)} key={ movie._id } src={ movie.cover } alt={ movie.title } className="row_cover" />
                   </CardLink>
                </div>
              ))
              }
              {
                <Error errors={error} />
              }
            </div>
            <h3 className="text-white pl-3" >Programas</h3>
            <div className="row_covers" >
              {
              programms.map(movie => (
                <div>
                   <CardLink tag={Link} to="/movie" >
                    <img onClick={() => setMovieIdInLocalStorage(movie._id)} key={ movie._id } src={ movie.cover } alt={ movie.title } className="row_cover" />
                   </CardLink>
                </div>
              ))
              }
              {
                error
              }
            </div>
            <h3 className="text-white pl-3" >Proximamente</h3>
            <div className="row_covers" >
              {
              comingsoon.map(movie => (
                <div>
                   <CardLink tag={Link} to="/movie" >
                    <img onClick={() => setMovieIdInLocalStorage(movie._id)} key={ movie._id } src={ movie.cover } alt={ movie.title } className="row_cover" />
                   </CardLink>
                </div>
              ))
              }
              {
                error
              }
            </div>
            <h3 className="text-white pl-3" >Originales</h3>
            <div className="row_covers" >
              {
              foundMovies.map(movie => (
                <div>
                   <CardLink tag={Link} to="/movie" >
                    <img onClick={() => setMovieIdInLocalStorage(movie._id)} key={ movie._id } src={ movie.cover } alt={ movie.title } className="row_cover" />
                   </CardLink>
                </div>
              ))
              }
              {
                error
              }
            </div>
          </div>
          <Footer />
        </div>
         );
    }

    return (
      <React.Fragment>
        { isAuth ? HomeAuth() : <Redirect to="/" /> }
      </React.Fragment>
    )
}

 
export default Home;



// lastMovie.map((movie) => 
//           <div>
//             <img src={ movie.cover } alt="" className="img-fluid" />
//           </div>
//           )
         