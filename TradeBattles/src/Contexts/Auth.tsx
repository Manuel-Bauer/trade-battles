import React, {FC, useContext, useState} from 'react';
import {UserInitializer} from '../shared/EmptyInitializers';
import {User} from '../shared/Types';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {ApiClient} from '../services/ApiClient.service';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '191720145630-k4pircur8hjk7712vbg8s85j18fo961f.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});

export interface IUserProvider {
  currentUser: User;
  setUser: (user: User) => void;
  login: () => Promise<User>;
  logout: () => Promise<void>;
  // signup: (email: string, password: string, firstName: string) => Promise<User>;
  // resetPassword: (email: string) => Promise<void>;
  // resendEmailVerififaction: () => Promise<void>;
  // idToken: string;
}

const UserContext = React.createContext<IUserProvider | null>(null);

/* ----- HOOK ----- */
export function useAuth() {
  return useContext<IUserProvider | null>(UserContext);
}

/* ----- PROVIDER ----- */
export const UserProvider: FC<any> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User>(UserInitializer);

  function login(): Promise<User> {
    return GoogleSignin.signIn().then(async ({user}) => {
      console.log('login() => GoogleSignin => .then(user ...', user);
      const userObject: User = {...user, watchlist: []} as unknown as User;
      const signedInUser = await ApiClient.handleSignIn(userObject);
      setCurrentUser(signedInUser.data as unknown as User);
      return signedInUser.data;
    });
  }

  async function logout(): Promise<void> {
    setCurrentUser(UserInitializer);
  }
  /*
    const [idToken, setIdToken] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    function signup(email: string, password: string): Promise<User> {
      // ...
    }

    function resendEmailVerififaction(): Promise<void> {
      // ...
    }



    function resetPassword(email: string): Promise<void> {
      // ...
    }
  */

  const value: IUserProvider = {
    currentUser,
    setUser: (user: User) => setCurrentUser(user),
    login,
    logout,
    // idToken,
    // signup,
    // login,
    // resetPassword,
    // resendEmailVerififaction,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
