import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';
import './indexForms.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

const RegisterForm = () => {

  const { setTokenInLocalStorage, isAuth } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [iconPassword, setIconPassword] = useState(true);

  if (isAuth) return <Redirect to="/home" />

  const handleInput = (e) => {
    switch (e.target.name) {
      case 'inputName':
        setName(e.target.value)
        break;
      case 'inputEmail':
        setEmail(e.target.value)
        break;
      case 'inputPassword':
        setPassword(e.target.value)
        break;
      default:
        break;  
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jsonSend = {
      first_name: name,
      email,
      password,
    }
    const SIGNUP_URI = `${process.env.REACT_APP_BACKEND_BASE_URL}/signup`;
    try {
      const axiosRes = await axios.post(SIGNUP_URI, jsonSend);
      // console.log(axiosRes.data);
      const { token } = axiosRes.data;
      setTokenInLocalStorage(token);  
      alert('Succesful login');
    } catch (error) {
      alert('error');
    }
  }

  const generator = require('generate-password');
  
    const passwordGenerator = generator.generate({
        length: 10,
        numbers: true
      });


    return ( 
      <div className="card border-0 mb-5 login_card">
        <div className="card-body mb-5">
          <div className="box" >
            <h5 className="card-title text-white logincard_text">Crear cuenta</h5>
            <form className="mb-5" onSubmit={handleSubmit} >

              <div className="form-group">
                <input 
                  required
                  value={name} 
                  name="inputName"
                  type="text" 
                  className="form-control" id="exampleFormControlTextarea1" placeholder="Nombre"
                  onChange={handleInput} />
              </div>  

              <div className="form-group">
                <input
                  required 
                  value={email}
                  name="inputEmail"
                  type="email" 
                  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                  placeholder="Email"
                  onChange={handleInput} />
              </div>

              <div className="form-group">
                <input 
                  required 
                  value={password}
                  name="inputPassword" 
                  type={iconPassword ? 'password' : 'text'}
                  className="form-control" 
                  id="exampleInputPassword1" 
                  placeholder="Contraseña"
                  onChange={handleInput} />
                  <i onClick={() => setIconPassword(!iconPassword)} className={`fa ${iconPassword ? 'fa-eye' : 'fa-eye-slash'} view_password_icon`} aria-hidden="true"></i>
              </div>

              <div>
                <span className="generate_password_txt d-inline pl-1 mr-2" >Para mayor seguridad genera una contraseña</span>
                <div className="btn btn-sm  btn_generate_password" onClick={(e) => e.preventDefault(setPassword(passwordGenerator))} >Generar</div>
                <small id="emailHelp" className="form-text text-muted invisible m-0">We'll never share your email with anyone else.efefefef</small>
              </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-4 border-0 button_login">Crear cuenta</button>

            </form>
            <h5 className="footer_txt_card" >Tienes una cuenta? <a href="/" >Inicia sesión</a> </h5>
          </div>
        </div>
    </div>
     );
}
 
export default RegisterForm;