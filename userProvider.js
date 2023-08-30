// userProvider.js
import axios from 'axios';

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
//   const [users, setUsers] = useState([
//     {
//       'id': 1,
//       'username': 'jk',
//       'password': 'jk',
//       'favouriteItems': [ ],
//       'name': 'jayakamalesh'
//     },
//     {
//       'id': 2,
//       'username': 'admin',
//       'password': 'password',
//       'favouriteItems': [ ],
//       'name': 'admin'
//     }
// ])
  const [fooddata, setfooddata]=useState();
  const [currentUser, setCurrentUser] = useState(null);

  const addToFavorites = async (userId, itemId) => {
    try {
        const response = await axios.post('http://192.168.1.5:5000/toggle-favorite', {
            userId,
            itemId,
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


  return (
    <UserContext.Provider value={{currentUser, setCurrentUser ,addToFavorites, setfooddata, fooddata}}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
