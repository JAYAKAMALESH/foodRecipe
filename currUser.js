import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState(
    [
      {
        'id': 1,
        'username': 'jk',
        'password': 'jk',
        'favouriteItems': null,
        'name': 'jayakamalesh'
      },
      {
        'id': 2,
        'username': 'admin',
        'password': 'password',
        'favouriteItems': null,
        'name': 'admin'
      }
    
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UserContext);
}
