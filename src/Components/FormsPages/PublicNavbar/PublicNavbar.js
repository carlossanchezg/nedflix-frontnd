import React from 'react';
import logo from '../../../assets/nedflixlogo.png';
import './PublicNavbar.css';
import { NavbarBrand } from 'reactstrap';

const PublicNavbar = () => {
    return ( 
        <div>
            <nav className="navbar navbar-light bg-light bg-transparent pt-md-4 navbr">
                <NavbarBrand href="/" >
                    <img className="nedflixlogo" src={logo} alt=""/>
                </NavbarBrand>
            </nav>
        </div>
     );
}
 
export default PublicNavbar;