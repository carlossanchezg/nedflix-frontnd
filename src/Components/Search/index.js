import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { MovieContext } from '../../contexts/MovieIdContext'
import Footer from '../Footer/Footer';
import Banner from '../Banner';
import Logo from '../../assets/nedflixlogo.png';
import { 
    NavLink, CardLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './index.css';


const Search = () => {

    const { isAuth, user } = useContext(AuthContext);
    const { setMovieIdInLocalStorage } = useContext(MovieContext); 
    const [show, hanldeShow] = useState(false);
    const[inputVal, setInputVal] = useState('');
    const[movie, setMovie] = useState([]);
    const[movies, setMovies] = useState([]);
    const[error, setError] = useState('');

    const AuthSearch = () => {

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

        const scrollnav = () => {
          window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
              hanldeShow(true);
            } else {
              hanldeShow(false);
            }
          });
          return () => {
            window.removeEventListener('scroll');
          };
        }
        scrollnav();
  
        const searchMovieTitle = async (e) => {
          e.preventDefault();
          const GET_MOVIE_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/searchmovie?title=${inputVal}`;
          try {
            const movieRes = await axios.get(GET_MOVIE_URI);
            setMovie(Object.assign({}, ...movieRes.data));
            // alert('encontrada');
          } catch (error) {
            alert('error in get movie');
          }
        }

        const similarMoviesFunction = () => {

            if (!movie && movies.length === 0) {
              console.log('NO hay');
            } else if (movie && movies.length > 0) {
              try {
                const similarMovies = movies.filter((movies) => movies.gender[0] === movie.gender[0] && movies._id !== movie._id );
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
            } 
          }

          return (
            <div className="body" >
                <div className={`nav ${show && 'nav_black_scroll'} `} >  
                <img 
                  src={Logo} 
                  alt="Nedflix Logo"
                  className="nedflix_logo_2" />
                  <div className="dropdown">
                    <button className="dropbtn">
                      Explorar 
                      <i className="fa fa-caret-down" aria-hidden="true"></i>
                    </button>
                    <div className="dropdown_content">
                      <NavLink tag={Link} to="/home" >Inicio<i class="fa fa-home ml-2" aria-hidden="true"></i>
                      </NavLink>
                      <NavLink tag={Link} to="/my-lists" >Mis Listas<i class="fa fa-list-ul ml-2" aria-hidden="true"></i>
                      </NavLink>
                      <NavLink tag={Link} to="/search" >Buscar<i class="fa fa-search ml-2" aria-hidden="true"></i>
                      </NavLink>
                    </div>
                  </div>
  
                  <div className="search_container">
                    <form onSubmit={searchMovieTitle} action="">
                      <input
                        value={inputVal} 
                        className="input_search"
                        type="text" 
                        name="" 
                        id=""
                        onChange={(e) => setInputVal(e.target.value)}/>
                        <i  class="fa fa-search search_icon" aria-hidden="true"></i>
                    </form>
                  </div>
                  
                  <div className="dropdown_2">
                   <img 
                      src={ user.img_profile } 
                      alt="Nedflix avatar profile"
                      className="nedflix_avatar" />
                    <div className="dropdown_content_2">
                        <NavLink tag={Link} to="/logout" className="text-center" >Cerrar Sesión</NavLink>
                    </div>
                  </div>
              </div>
              <Banner movieByTitle={movie} />
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
            { isAuth ? AuthSearch() : <Redirect to="/" /> }
          </React.Fragment>
        )
}
 
export default Search;