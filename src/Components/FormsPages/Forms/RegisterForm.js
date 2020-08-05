import React, { useState } from 'react';
import './indexForms.css';
import 'font-awesome/css/font-awesome.min.css';

const RegisterForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [iconPassword, setIconPassword] = useState(true);

  const handleInput = (e) => {
    switch (e.target.name) {
      case 'inputPassword':
        setPassword(e.target.value)
        break;
      default:
        break;  
    };
  };

  const generator = require('generate-password');
  
    const passwordGenerator = generator.generate({
        length: 10,
        numbers: true
      });


    return ( 
        <div className="card border-0 mb-5 logincard">
        <div className="card-body mb-5">
          <div className="box" >
            <h5 className="card-title text-white logincard-text">Crear cuenta</h5>
            <form className="mb-5" >
              <div className="form-group">
                <input required type="text" className="form-control" id="exampleFormControlTextarea1" placeholder="Nombre" />
              </div>  
              <div className="form-group">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                placeholder="Email" />
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
                  <i onClick={() => setIconPassword(!iconPassword)} className={`fa ${iconPassword ? 'fa-eye' : 'fa-eye-slash'} view-password-icon`} aria-hidden="true"></i>
              </div>
              <div>
                <span className="generatepassword d-inline pl-1 mr-2" >Para mayor seguridad genera una contraseña</span>
                <button className="btn btn-sm  btngeneratepassword" onClick={(e) => e.preventDefault(setPassword(passwordGenerator))} >Generar</button>
                <small id="emailHelp" className="form-text text-muted invisible m-0">We'll never share your email with anyone else.efefefef</small>
              </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-4 border-0 buttonlogin">Crear cuenta</button>
            </form>
            <h5 className="txtcard" >Tienes una cuenta? <a href="/" >Inicia sesión</a> </h5>
          </div>
        </div>
    </div>
     );
}
 
export default RegisterForm;