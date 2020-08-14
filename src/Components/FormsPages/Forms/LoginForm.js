import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import './indexForms.css';
import axios from 'axios';


const LoginForm = () => {

  const { setTokenInLocalStorage, isAuth } = useContext(AuthContext);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  if (isAuth) return <Redirect to="/home" />

  const handleInput = (e) => {

    switch (e.target.name) {
      case 'inputEmail':
        setEmail(e.target.value);
        break;
      case 'inputPassword':
        setPassword(e.target.value);
        break;
        default:
        break;
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonSend = {
      email,
      password
    }
    const LOGIN_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/login`;
    try {
      const axiosRes = await axios.post(LOGIN_URI, jsonSend);
      const { token } = axiosRes.data;
      setTokenInLocalStorage(token);
      alert('Succesfull login'); 
    } catch (error) {
      alert('Login error');
    }
  }

    return ( 
    <div className="card border-0 mb-5 login_card">
        <div className="card-body mb-5">
          <div className="" >
            <h5 className="card-title text-white logincard_text">Inicia sesión</h5>
            <form className="mb-5" onSubmit={handleSubmit} >
              <div className="form-group mb-0">
                <input
                required
                value={email} 
                type="email"
                name="inputEmail" 
                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"
                onChange={handleInput} />
                  <small id="emailHelp" className="form-text text-muted invisible m-0">We'll never share your email with anyone else.efefefef</small>
              </div>
              <div className="form-group">
                <input
                required
                value={password} 
                type="password"
                name="inputPassword" 
                className="form-control" id="exampleInputPassword1" placeholder="Contraseña"
                onChange={handleInput} />
              </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-5 border-0 button_login">Iniciar sesión</button>
            </form>
            <h5 className="footer_txt_card" >No tienes una cuenta? <a href="/register" >Crea una</a> </h5>
          </div>
        </div>
    </div>  
     );
}
 
export default LoginForm;