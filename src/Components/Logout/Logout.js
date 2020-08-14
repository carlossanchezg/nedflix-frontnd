import React, { useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const { removeTokenInLocalStorage } = useContext(AuthContext);
    removeTokenInLocalStorage();
    alert('Succesfull logout');
    return ( 
        <Redirect to="/" />
     );
}
 
export default Logout;