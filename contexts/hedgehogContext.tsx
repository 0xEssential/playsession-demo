import { Hedgehog } from '@audius/hedgehog';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import Firebase from '../utils/firebase';

export const messages = {
  signedIn: {
    header: `You're Signed In!`,
    body: `You just created an account using Hedgehog! Now, if you log out you will be able to sign back in with the same credentials.`,
  },
  signedOut: {
    header: `You're Not Signed In`,
    body: `You are currently unauthenticated / signed out.`,
    instructions: `Go ahead and create an account just like you would a centralized service.`,
  },
  invalid: `Incorrect username or password. Try again.`,
  empty: `Please enter a username and password.`,
  exists: `Account already exists, please try logging in.`,
  mismatched: `The passwords you entered don't match.`,
};

type HedgehogContextValues = {
  hedgehog?: any;
  signedIn: boolean;
  hedgehogLoading: boolean;
  errorMessage?: string;
  handleSignUp?: ({
    username,
    password,
    passwordConfirmation,
  }: {
    username: string;
    password: string;
    passwordConfirmation: string;
  }) => Promise<void>;
  handleLogin?: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout?: () => void;
};

const defaultValue: HedgehogContextValues = {
  signedIn: false,
  hedgehogLoading: false,
};

const HedgehogContext = createContext(defaultValue);

const AUTH_TABLE = 'Authentications';
const USER_TABLE = 'Users';

const HedgehogContextProvider = ({ children }: any): ReactElement => {
  const [hedgehog, setHedgehog] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hedgehogLoading, setLoading] = useState(false);

  const checkWalletStatus = () => {
    if (hedgehog?.isLoggedIn()) {
      setSignedIn(true);
    } else {
      if (
        hedgehog &&
        hedgehog.walletExistsLocally &&
        hedgehog.walletExistsLocally()
      ) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    }
  };

  const handleLogin = async ({ username, password }) => {
    setErrorMessage('');
    setLoading(true);
    try {
      await hedgehog.login(username, password);
      checkWalletStatus();
    } catch (e) {
      console.error(e);
      setErrorMessage(messages.invalid);
    }
    setLoading(false);
  };

  const handleSignUp = async ({ username, password, passwordConfirmation }) => {
    if (password !== passwordConfirmation) {
      setErrorMessage(messages.mismatched);
    } else if (!password || !username || !passwordConfirmation) {
      setErrorMessage(messages.empty);
    } else {
      setLoading(true);
      setErrorMessage('');
      try {
        await hedgehog.signUp(username, password);
        checkWalletStatus();
      } catch (e) {
        console.error(e);
        setErrorMessage(messages.exists);
      }
      setLoading(false);
    }
  };

  const logout = () => {
    hedgehog.logout();
    checkWalletStatus();
  };

  useEffect(() => {
    const firebase = new Firebase();
    const setAuthFn = async (obj) =>
      firebase.createIfNotExists(AUTH_TABLE, obj.lookupKey, obj);
    const setUserFn = async (obj) =>
      firebase.createIfNotExists(USER_TABLE, obj.username, obj);
    const getFn = async (obj) =>
      firebase.readRecordFromFirebase(AUTH_TABLE, obj);

    const _hedgehog = new Hedgehog(getFn, setAuthFn, setUserFn);
    setHedgehog(_hedgehog);
  }, []);

  useEffect(() => {
    if (!hedgehog) return;
    checkWalletStatus();
  }, [hedgehog]);

  const value = {
    hedgehog,
    signedIn,
    checkWalletStatus,
    errorMessage,
    hedgehogLoading,
    handleLogin,
    handleSignUp,
    logout,
  };

  return (
    <HedgehogContext.Provider value={value}>
      {children}
    </HedgehogContext.Provider>
  );
};

export default HedgehogContextProvider;
export { HedgehogContext };
