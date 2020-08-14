import React from 'react';
import './Footer.css';

const Footer = () => {
    return ( 
    <div className="card border-0 rounded-0 p-2 footer_card">
        <div className="container card-body mb-5">
            <div className="row">
                <div className="col-12">
                    <p>
                        <a href="" className="fonts">Preguntas frecuentes</a>
                    </p>   
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>
                        <a href="" className="fonts">Términos de uso</a>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>
                        <a href="" className="fonts">Privacidad</a>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>
                        <a href="" className="fonts">Cuenta</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default Footer;