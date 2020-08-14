import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar';
import { 
    CardLink, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieIdContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './MovieInfo.css';
import Banner from '../Banner';
import Footer from '../Footer/Footer';

const MovieInfo = () => {

  const { isAuth } = useContext(AuthContext);   
    
    const MovieInfoAuth = () => {

      const { setMovieIdInLocalStorage } = useContext(MovieContext); 
      const[movieId, setMovieId] = useState({});
      const[movies, setMovies] = useState([]);
      const[error, setError] = useState('');
    
        useEffect(() => {
            async function getMovie() {
              const MOVIES_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/movies/${localStorage.getItem('movieId')}`;
              try {
                const movieRes = await axios.get(MOVIES_URI);
                // console.log('el movieRes en useeFFECT DE OBTENER LA PELICULA POR EL movieId localstorage',movieRes.data);
                setMovieId(movieRes.data);
                return movieRes
              } catch (error) {
                setError('Error in get movies');
              }
            }
            getMovie();
          }, []);
          // console.log('movieiD abajo de su useffect',movieId);
    
          useEffect(() => {
            async function getMoviesAuthToken() {
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
            getMoviesAuthToken();
          }, []);
    
          // const similarMovies = movies.filter((movie) => movie.gender[0] === movieId.gender[0]); 
          // console.log(movieId);

          // console.log(movies);
          // console.log(movieId);
          // console.log(similarMovies);


          // const similarMoviesFunction = () => {
          //   if (!movieId && !movies) return(<h2 className="text-white" >Cargando...</h2>)
          //   if (movieId && movies) {
          //     const similarMovies = movies.filter((movie) => movie.gender[0] === movieId.gender[0]); 
          //     console.log(movieId);
          //     return(
          //       <div className="row_covers mb-4" >
          //         {
          //           similarMovies.map((movies) => (
          //             <div>
          //               <CardLink tag={Link} to="/movie">
          //                 <img onClick={() => setMovieIdInLocalStorage(movies._id)} src={ movies.cover } alt={ movies.title } className="row_cover" />
          //               </CardLink>
          //             </div>))
          //         }
          //       </div>
          //     )
          //   }
          // }

          // const similarMoviesFunction = () => {
          //   if (!movieId) return <h1 className="text-white" >Cargando...</h1>
          //   if (movies.length === 0) return <h1 className="text-white" >Cargando...</h1>

          //   console.log('la MOVIE ID',movieId);
          //   if (movieId) {
          //     if (movies.length > 0) {
                
          //     }
          //   }
          // }

          // console.log('movieId fuera del else if',movieId);
          // console.log('movies fuera del else if',movies);

          const similarMoviesFunction = () => {

            if (!movieId && movies.length === 0) {
              console.log('NO hay');
            } else if (movieId && movies.length > 0) {
              try {
                const similarMovies = movies.filter((movie) => movie.gender[0] === movieId.gender[0] && movie._id !== movieId._id );
                return(
                  <div className="row_covers mb-4"  >
                  {
                    similarMovies.map((movie) => (
                      <div>
                        <CardLink tag={Link} to="/similar-movie">
                          <img onClick={() => setMovieIdInLocalStorage(movie._id)} src={ movie.cover } alt={ movie.title } className="row_cover" />
                        </CardLink>
                      </div>
                    )) 
                  }
                  </div>
                )
              } catch (error) {
                console.log('ocurrio un error');
              }
                // return (
                //     { 
                //     }
                // )
            } 
          }

          // console.log(typeof movies, movies);
          // console.log(typeof movieId, movieId);
          // console.log(movies);
          // console.log(movieId);
          // console.log('LA PELICULA DE MOVIES', movieId);

        return (
            <div className="body" >
              <NavigationBar />
              <Banner movieIdBanner={movieId} />
              <h3 className="text-white pl-3" >Similares</h3>
                {
                  similarMoviesFunction()
                }
              <Footer />
            </div> 
         );
    }

    return (
        <React.Fragment>
          { isAuth ? MovieInfoAuth() : <Redirect to="/" /> }
        </React.Fragment>
      )
}
 
export default MovieInfo;