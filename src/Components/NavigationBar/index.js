import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import logo from '../../assets/nedflixlogo.png';
import './index.css';
import { 
    NavbarBrand, 
    NavLink, } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

const NavigationBar = () => {
    
    const { isAuth, user } = useContext(AuthContext);
    const [show, hanldeShow] = useState(false);

    const PublicNavbar = () => {
        return ( 
            <div>
                <nav className="navbar navbar-light bg-light bg-transparent pt-md-4 navbr">
                    <NavbarBrand href="/" >
                        <img className="nedflix_logo" src={logo} alt="Nedflix Logo"/>
                    </NavbarBrand>
                </nav>
            </div>
         );
    }

    const AuthNavbar = () => {

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

        return ( 
            <div className={`nav ${show && 'nav_black_scroll'} `} >  
              <img 
                src={logo} 
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
             );
    }

    return (
        <React.Fragment>
          { isAuth ? AuthNavbar() : PublicNavbar() }
        </React.Fragment>
      )
}
 
export default NavigationBar;