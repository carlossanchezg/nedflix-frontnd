import React, { createContext, useState, useEffect } from 'react';
import decode from 'jwt-decode';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {  
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
  
    const getTokenInLocalStorage = () => {
      return localStorage.getItem('token');
    }
  
    const setTokenInLocalStorage = (token) => {
      localStorage.setItem('token', token);
      const decoded = decode(token);
        setUser(decoded);
        setIsAuth(true);
    }
  
    const removeTokenInLocalStorage = () => {
      localStorage.removeItem('token');
        setUser({});
        setIsAuth(false);
    }
  
    useEffect(() => {
      const token = getTokenInLocalStorage();
      if (token) {
        const decoded = decode(token);
        setUser(decoded);
        setIsAuth(true);
      }
    }, []);
    
    return (
      <AuthContext.Provider value={{
        user,
        isAuth,
        setIsAuth,
        getTokenInLocalStorage,
        setTokenInLocalStorage,
        removeTokenInLocalStorage,
      }}>
        { props.children }
      </AuthContext.Provider>
    )
  };
  
  export default AuthContextProvider;
  