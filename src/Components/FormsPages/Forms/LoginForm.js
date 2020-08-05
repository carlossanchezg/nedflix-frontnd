import React from 'react';
import './indexForms.css';

const LoginForm = () => {
    return ( 
    <div className="card border-0 mb-5 logincard">
        <div className="card-body mb-5">
          <div className="" >
            <h5 className="card-title text-white logincard-text">Inicia sesión</h5>
            <form className="mb-5" >
              <div className="form-group mb-0">
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                  <small id="emailHelp" className="form-text text-muted invisible m-0">We'll never share your email with anyone else.efefefef</small>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
              </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block mt-5 border-0 buttonlogin">Iniciar sesión</button>
            </form>
            <h5 className="txtcard" >No tienes una cuenta? <a href="/register" >Crea una</a> </h5>
          </div>
        </div>
    </div>  
     );
}
 
export default LoginForm;