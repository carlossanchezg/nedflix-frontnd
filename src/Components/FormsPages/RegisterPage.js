import React from 'react';
import './index.css';
import RegisterForm from './Forms/RegisterForm';
import NavigationBar from '../NavigationBar';
import Footer from '../Footer/Footer';

const RegisterPage = () => {
    return ( 
    <div className="bgsm">
      <div className="bgimg">
        <div className="container-fluid mb-md-2">
          <NavigationBar />
        </div>
        <div className="container-fluid d-flex justify-content-center pr-0 pl-0 smsize lgsize">
          <RegisterForm />
        </div>
        <Footer />
      </div>
    </div>
     );
}
 
export default RegisterPage;