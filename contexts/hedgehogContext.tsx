import { Hedgehog } from '@audius/hedgehog';
import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import EssentialForwarderContract from '~abis/EssentialForwarder.json';

const BASE_URL = 'https://burner-auth-api.herokuapp.com/';

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

const client = applyCaseMiddleware(
  axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { 'API-KEY': process.env.API_KEY },
  }),
);

const makeRequestToService = async (axiosRequestObj) => {
  try {
    const resp = await client(axiosRequestObj);
    if (resp.status === 200) {
      return resp.data;
    } else {
      throw new Error(
        `Server returned error: ${resp.status.toString()} ${
          resp.data['error']
        }`,
      );
    }
  } catch (e) {
    console.error(e);
    throw new Error(
      `Server returned error: ${e.response.status.toString()} ${
        e.response.data['error']
      }`,
    );
  }
};

type HedgehogContextValues = {
  authorized: boolean;
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
  updateAuthorization?: (address: string) => Promise<void>;
};

const defaultValue: HedgehogContextValues = {
  authorized: false,
  signedIn: false,
  hedgehogLoading: false,
};

const HedgehogContext = createContext(defaultValue);

const HedgehogContextProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [hedgehog, setHedgehog] = useState(null);
  const [signedIn, setSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hedgehogLoading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

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
    const setAuthFn = async (obj) =>
      await makeRequestToService({
        url: `authentications`,
        method: 'post',
        data: obj,
      });

    const setUserFn = async (obj) =>
      await makeRequestToService({
        url: `users`,
        method: 'post',
        data: obj,
      });

    const getFn = async (obj) => {
      console.warn(obj);
      return await makeRequestToService({
        url: 'authentications',
        method: 'get',
        params: obj,
      });
    };

    const _hedgehog = new Hedgehog(getFn, setAuthFn, setUserFn);
    setHedgehog(_hedgehog);
  }, []);

  useEffect(() => {
    if (!hedgehog) return;
    checkWalletStatus();
  }, [hedgehog]);

  const EssentialForwarderRead = new Contract(
    EssentialForwarderContract.address,
    EssentialForwarderContract.abi,
    new JsonRpcProvider(process.env.RPC_URL),
  );

  const updateAuthorization = async (address: string) => {
    console.warn('checcking auth');
    EssentialForwarderRead.getSession(address)
      .then((resp) => {
        console.warn(resp);
        const now = Date.now();
        const timestamp = resp.expiresAt.mul(1000);

        setAuthorized(
          getAddress(resp.authorized) ===
            getAddress(hedgehog.getWallet().getAddressString()) &&
            timestamp.gt(now),
        );
      })
      .catch((e) => {
        console.warn(e);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const value = {
    hedgehog,
    signedIn,
    checkWalletStatus,
    errorMessage,
    hedgehogLoading,
    handleLogin,
    handleSignUp,
    logout,
    updateAuthorization,
    authorized,
  };

  return (
    <HedgehogContext.Provider value={value}>
      {children}
    </HedgehogContext.Provider>
  );
};

export default HedgehogContextProvider;
export { HedgehogContext };
