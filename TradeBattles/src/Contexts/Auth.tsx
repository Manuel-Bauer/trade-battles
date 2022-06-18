import React, {FC, useContext, useState} from 'react';
import {User} from '../shared/Types';

export interface IUserProvider {
  currentUser: User;
  setUser: (user: User) => void;
  // signup: (email: string, password: string, firstName: string) => Promise<User>;
  // login: (email: string, password: string) => Promise<User>;
  // logout: () => Promise<void>;
  // resetPassword: (email: string) => Promise<void>;
  // resendEmailVerififaction: () => Promise<void>;
  // idToken: string;
}

const UserContext = React.createContext<IUserProvider | null>(null);

/* ----- HOOK ----- */
export function useDesign() {
  return useContext<IUserProvider | null>(UserContext);
}

/* ----- PROVIDER ----- */
export const UserProvider: FC<any> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User>();

  /* 
    const [idToken, setIdToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    function signup(email: string, password: string): Promise<User> {
      // ...
    }
    function resendEmailVerififaction(): Promise<void> {
      // ...
    }

    function login(email: string, password: string): Promise<User> {
      // ...
    }

    function logout(): Promise<void> {
      // ...
    }

    function resetPassword(email: string): Promise<void> {
      // ...
    }
  */

  const value: IUserProvider = {
    currentUser,
    setUser: (user: User) => setCurrentUser(user),
    // idToken,
    // signup,
    // login,
    // logout,
    // resetPassword,
    // resendEmailVerififaction,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
