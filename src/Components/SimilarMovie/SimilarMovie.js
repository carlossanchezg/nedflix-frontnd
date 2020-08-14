import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar';
import { 
    CardLink, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieIdContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './SimilarMovieInfo.css';
import Banner from '../Banner';
import Footer from '../Footer/Footer';

const SimilarMovieInfo = () => {

    const { isAuth } = useContext(AuthContext);   


    const SimilarMovieInfoAuth = () => {

      const { setMovieIdInLocalStorage } = useContext(MovieContext); 
      const[movieId, setMovieId] = useState([]);
      const[movies, setMovies] = useState([]);
      const[error, setError] = useState('');
    

        useEffect(() => {
            async function getMovie() {
              const MOVIES_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/movies/${localStorage.getItem('movieId')}`;
    
              try {
                const movieRes = await axios.get(MOVIES_URI);
                setMovieId(movieRes.data);
                return movieRes
              } catch (error) {
                setError('Error in get movies');
              }
            }
            getMovie();
          }, []);
    
        
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
    
         

          // const similarMoviesFunction = () => {
          //   if (!movieId) return <h1 className="text-white" >Cargando...</h1>
          //   if (movies.length === 0) return <h1 className="text-white" >Cargando...</h1>
          //   if (movieId) {
          //     if (movies.length > 0) {
          //       const similarMovies = movies.filter((movie) => movie.gender[0] === movieId.gender[0]);
          //       return (
          //         <div className="row_covers mb-4" >
          //           { movies.map((movie) => (
          //             <div>
          //               <CardLink tag={Link} to="/movie">
          //                 <img onClick={() => setMovieIdInLocalStorage(movie._id)} src={ movie.cover } alt={ movie.title } className="row_cover" />
          //               </CardLink>
          //               {console.log(similarMovies)}
          //             </div>
          //           )) 
          //           }
          //         </div>
          //       )
          //     }
          //   }
          // }
          
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
                        <CardLink tag={Link} to="/movie">
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
          // console.log('LA PELICULA DE SIMILAR', movieId);

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
          { isAuth ? SimilarMovieInfoAuth() : <Redirect to="/" /> }
        </React.Fragment>
      )
}
 
export default SimilarMovieInfo;