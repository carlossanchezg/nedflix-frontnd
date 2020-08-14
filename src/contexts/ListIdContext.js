import React, { createContext, useState, useEffect } from 'react';
export const ListContext = createContext();

const ListContextProvider = (props) => {  
    const [listIdContext, setListIdContext] = useState('');
  
    const getListIdInLocalStorage = () => {
      return localStorage.getItem('listId');
    }
  
    const setListIdInLocalStorage = (listId) => {
      localStorage.setItem('listId', listId);
    }
  
    const removeListIdInLocalStorage = () => {
      localStorage.removeItem('ListId');
    }
  
    useEffect(() => {
      const list = getListIdInLocalStorage();
      if (list) {
      }
    }, []);
    
    return (
      <ListContext.Provider value={{
        listIdContext,
        setListIdContext,
        getListIdInLocalStorage,
        setListIdInLocalStorage,
        removeListIdInLocalStorage,
      }}>
        { props.children }
      </ListContext.Provider>
    )
  };
  
  export default ListContextProvider;
  