import React from 'react';
import './index.css';
import PublicNavbar from './PublicNavbar/PublicNavbar';
import LoginForm from './Forms/LoginForm';
import Footer from '../Footer/Footer';

const LoginPage = () => {
    return ( 
    <div className="bgsm">
      <div className="bgimg">
        <div className="container-fluid mb-md-2">
          <PublicNavbar />
        </div>
        <div className="container-fluid d-flex justify-content-center pr-0 pl-0 smsize lgsize">
          <LoginForm />
        </div>
        <Footer />
      </div>
    </div>
     );
}
 
export default LoginPage;