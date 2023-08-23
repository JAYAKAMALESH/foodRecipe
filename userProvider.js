// userProvider.js

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    {
      'id': 1,
      'username': 'jk',
      'password': 'jk',
      'favouriteItems': [ ],
      'name': 'jayakamalesh'
    },
    {
      'id': 2,
      'username': 'admin',
      'password': 'password',
      'favouriteItems': [ ],
      'name': 'admin'
    }
])

  const [currentUser, setCurrentUser] = useState(null);

  const addToFavorites = (userId, itemId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        if (user.favouriteItems.includes(itemId)) {
          user.favouriteItems = user.favouriteItems.filter(id => id !== itemId);
        } else {
          user.favouriteItems.push(itemId);
        }
      }
      return user;
    });
  
    setUsers(updatedUsers);
  };
  
  



  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser ,addToFavorites}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
