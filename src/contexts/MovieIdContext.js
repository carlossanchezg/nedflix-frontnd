import React, { createContext, useState, useEffect } from 'react';
export const MovieContext = createContext();

const MovieContextProvider = (props) => {  
    const [movieIdContext, setMovieIdContext] = useState('');
  
    const getMovieIdInLocalStorage = () => {
      return localStorage.getItem('movieId');
    }
  
    const setMovieIdInLocalStorage = (movieId) => {
      localStorage.setItem('movieId', movieId);
    }
  
    const removeMovieIdInLocalStorage = () => {
      localStorage.removeItem('movieId');
    }
  
    useEffect(() => {
      const movie = getMovieIdInLocalStorage();
      if (movie) {
      }
    }, []);
    
    return (
      <MovieContext.Provider value={{
        movieIdContext,
        setMovieIdContext,
        getMovieIdInLocalStorage,
        setMovieIdInLocalStorage,
        removeMovieIdInLocalStorage,
      }}>
        { props.children }
      </MovieContext.Provider>
    )
  };
  
  export default MovieContextProvider;
  