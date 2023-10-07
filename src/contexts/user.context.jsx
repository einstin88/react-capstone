import { createContext, useEffect, useState } from 'react';
import {
  authStateListener,
  createUserDocFromAuth,
} from '../services/firebase/firebase.service';


export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = authStateListener((user) => {
      if (user) createUserDocFromAuth(user);
      setCurrentUser(user);
    });

    return unsub;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
