import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer/Footer';

const WatchMovie = () => {

  const { isAuth } = useContext(AuthContext);   

  const AuthWatchMovie = () => {
    const[movieId, setMovieId] = useState([]);
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

    return ( 
        <div className="body " >
            <div class="embed-responsive embed-responsive-16by9 mb-5">
                <iframe class="embed-responsive-item" src={`https://www.youtube.com/embed/${movieId.video_movie}`} allowfullscreen></iframe>
            </div>
            <Footer />
        </div> 
     );
  }
  return (
    <React.Fragment>
      { isAuth ? AuthWatchMovie() : <Redirect to="/" /> }
    </React.Fragment>
  )
}
 
export default WatchMovie;