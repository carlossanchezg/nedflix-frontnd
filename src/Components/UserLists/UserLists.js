import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ListContext } from '../../contexts/ListIdContext';
import axios from 'axios';
import NavigationBar from '../NavigationBar';
import './UserLists.css';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import Footer from '../Footer/Footer';

Modal.setAppElement('#root');
const UserLists = () => {

  const { isAuth } = useContext(AuthContext);

   const AuthUserLists = () => {

    const { user } = useContext(AuthContext);
    const { setListIdInLocalStorage } = useContext(ListContext);
    const[foundUser, setFoundUser] = useState([]);
    const[modalIsOpen, setModalIsOpen] = useState(false);
    const[secondModalIdOpen, setSecondModalIsOpen] = useState(false);
    const[movieId, setMovieId] = useState('');
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
    }, [modalIsOpen, secondModalIdOpen]); 
    
    // useEffect(() => {
    //     async function getUser() {
    //       const GET_USER_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}`;
    //       try {
    //         const userRes = await axios.get(GET_USER_URI);
    //         setFoundUser(userRes.data);
    //         return userRes
    //       } catch (error) {
    //         setError('Error in get movies');
    //       }
    //     }
    //     getUser();
    //   }, [modalIsOpen, secondModalIdOpen, user.id]); 


      const deleteList = async (e) => {
        e.preventDefault();
        const DELETE_LIST_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}/lists/${localStorage.getItem('listId')}`;
        try {
          const listRes = await axios.delete(DELETE_LIST_URI);
          alert('lista eliminada');
          setModalIsOpen(false);
        } catch (error) {
          alert('error al eliminar lista');
        }
      }

      const deleteMovieToList = async (e) => {
        e.preventDefault();
        const DELETE_MOVIE_TO_LIST_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/users/${user.id}/lists/${localStorage.getItem('listId')}/${movieId}`;
        try {
          const movieRes = await axios.patch(DELETE_MOVIE_TO_LIST_URI);
          alert('Pelicula removida');
          setSecondModalIsOpen(false);
        } catch (error) {
          alert('Error al remover pelicula');
        }
      }

    return ( 
        <div className="body" >
          <NavigationBar />
          <div className="pt-5" />
          <div className="pt-2" />
          <h3 className="text-white pl-4 pt-4" >Mis Listas</h3>
          <div className="ml-3" >
              {
                foundUser.map((lists) => {
                  return lists.user_list.map((userlist) => {
                  return [ <div className="my_list mt-5" ><div className="name_button_list_container" ><h3 className="text-white ml-3 list_name" >{ userlist.name_list }</h3><i onClick={() => {
                    setModalIsOpen(true);
                    setListIdInLocalStorage(userlist._id)}} class="fa fa-minus-circle edit_list_icon" aria-hidden="true"></i> 
                    <Modal 
                    isOpen={modalIsOpen}
                    className="modal_delete" >
                      <h1 className="text_modal" >¿Seguro que quieres Eliminar la lista?</h1>
                      <form onSubmit={deleteList} action="">
                        <div className="modal_buttons_container">
                          <button 
                          onClick={() => setModalIsOpen(false)}
                          className="cancel_button" >
                            Cancelar
                          </button>
                          <button 
                          type="submit"
                          className="delete_button" >
                            Eliminar
                          </button>
                        </div>
                      </form>
                    </Modal> </div></div>, <div className="row_covers_lists" >{  userlist.list_content.map((movie) => {
                    return <div className="icon_img_container" >
                       <i 
                      onClick={() => {
                        setListIdInLocalStorage(userlist._id);
                        setMovieId(movie._id);
                        setSecondModalIsOpen(true);
                      }}
                      class="fa fa-minus-circle delete_movie_icon" aria-hidden="true"></i>
                      <Modal 
                      isOpen={secondModalIdOpen}
                      className="modal_delete_2" >
                        <h2 className="text_modal_2" >¿Seguro qur quieres eliminar esta pelicula?</h2>
                        <form onSubmit={deleteMovieToList} action="" >
                          <div className="modal_buttons_container_2">
                            <button 
                            onClick={() => {
                              setSecondModalIsOpen(false);
                            }}
                            className="cancel_button_2" >
                              Cancelar
                            </button>
                            <button 
                            type="submit"
                            className="delete_button_2" >
                              Eliminar
                            </button>
                          </div>
                        </form>
                      </Modal>
                      <img src={ movie.cover } alt={ movie.title } className="row_cover_lists" />
                    </div>
                  })  }</div> ]
                  })
                })
              }
          </div>
          <Footer />
        </div>
     );
   }
   return (
    <React.Fragment>
      { isAuth ? AuthUserLists() : <Redirect to="/" /> }
    </React.Fragment>
  )
}
 
export default UserLists;