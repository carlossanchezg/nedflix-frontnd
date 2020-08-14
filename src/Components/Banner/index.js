import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { 
    CardLink, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MovieContext } from '../../contexts/MovieIdContext';
import { ListContext } from '../../contexts/ListIdContext';
import { AuthContext } from '../../contexts/AuthContext';
import './index.css';


import Modal from 'react-modal';

Modal.setAppElement('#root');
const Banner = (props) => {

    const { setMovieIdInLocalStorage } = useContext(MovieContext);
    const { setListIdInLocalStorage } = useContext(ListContext);
    const { user } = useContext(AuthContext);

    const[movieId, setMovieId] = useState('');
    const[nameList, setNameList] = useState('');
    const[foundUser, setFoundUser] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
    const[error, setError] = useState('');


      useEffect(() => {
        async function getUser() {
          const GET_USER_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}`;
          try {
            const userRes = await axios.get(GET_USER_URI);
            setFoundUser(userRes.data);
            return userRes
          } catch (error) {
            setError('Error in get movies');
          }
        }
        getUser();
      }, [modalIsOpen, modalIsOpenTwo]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        const jsonSend = {
          name_list: nameList,
        }
        const CREATE_LIST_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}/newlist`;
        try {
          const nameListRes = await axios.post(CREATE_LIST_URI, jsonSend);
          setModalIsOpenTwo(false);
          console.log(nameListRes.data);
          alert('List created');
        } catch (error) {
          alert('Error create list');
        }
      }

      const addMovieList = async (e) => {
        const ADD_MOVIE_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}/lists/${localStorage.getItem('listId')}/${movieId}`;
        try {
          const addMovieRes = await axios.post(ADD_MOVIE_URI);
          alert('Pelicula agregada');
        } catch (error) {
          alert('error al agregar pelicula');
        }
      }
 
      const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n -1) + '...' : str;
      }

    return ( 
        <header
              className="banner"
              style={{
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to right, rgba(37, 37, 37, 0.61), transparent 90%), url("${ props.movieByTitle?.cover || props.movieIdBanner?.cover}")`,
                backgroundPosition: "center center"
              }}
            >
              <div className="banner_contents" >
                <h1 className="banner_title" >{ props.movieByTitle?.title || props.movieIdBanner?.title }</h1>
                <div className="banner_buttons">
                  <CardLink tag={Link} to="/watch-movie" >
                    <button onClick={() => setMovieIdInLocalStorage(props.movieByTitle._id || props.movieIdBanner._id)} className="banner_button_1">
                    <i className="fa fa-play" aria-hidden="true"></i>
                    Reproducir
                    </button>
                  </CardLink>
                  <CardLink 
                  tag={Link} to="/watch-trailer"
                  className="card_link" >
                          <button onClick={() => setMovieIdInLocalStorage(props.movieByTitle._id || props.movieIdBanner._id)} className="banner_button_2">
                            <i className="fa fa-play" aria-hidden="true"></i>
                            Ver Trailer 
                          </button>
                        </CardLink>
                  <button onClick={() => { setModalIsOpen(true)
                  setMovieId(props.movieByTitle._id || props.movieIdBanner._id)}} className="banner_button_3">
                  <i className="fa fa-plus-square" aria-hidden="true"></i>
                  Mi lista
                  </button>
                  <Modal 
                  isOpen={modalIsOpen}
                  className="modal_list" >
                    <Modal
                    className="modal_list_create_list" 
                    isOpen={modalIsOpenTwo}
                     >
                    <i onClick={() => setModalIsOpenTwo(false)} className="fa fa-times modal_list_close_icon_create_list" aria-hidden="true"></i>
                    <h5 className="create_list_text" >Crear nueva lista</h5>
                    <form onSubmit={handleSubmit} action="">
                      <div className="form-group input_container">
                        <input 
                        value={nameList}
                        className="input_create_list" type="text"
                        onChange={(e) => setNameList(e.target.value)} />
                      </div>
                      <div className="buttons_create_cancel_list" >
                        <button
                        type="submit" className="create_list_button" >
                          Crear 
                        </button>
                        <button onClick={() => setModalIsOpenTwo(false)}className="cancel_list_button" >
                          Cancelar
                        </button>
                      </div>
                    </form>
                    </Modal>
                    <i onClick={() => setModalIsOpen(false)} className="fa fa-times modal_list_close_icon" aria-hidden="true"></i>
                    <h2 className="modal_list_text" >Agregar a lista</h2>
                    <div className="create_new_list_container" >
                      <button onClick={() => setModalIsOpenTwo(true)}
                      className="create_new_list_button" >Crear nueva lista</button>
                    </div>
                    <div className="user_lists_container" >
                      {
                        foundUser.map((lists) => {
                          return lists.user_list.map((userlist) => {
                            return [ <button onClick={() => {
                              setListIdInLocalStorage(userlist._id)
                              addMovieList()
                              setModalIsOpen(false)
                            }} className="user_list_name" >{ userlist.name_list }</button> ]
                          });
                        })
                      }
                    </div>
                  </Modal>
                </div>
                <h1 className="banner_synopsis">
                  { truncate( props.movieByTitle?.synopsis || props.movieIdBanner?.synopsis, 150) }
                </h1>
              </div>
              <div className="banner_fadebottom" />
            </header>
     );
}
 
export default Banner;