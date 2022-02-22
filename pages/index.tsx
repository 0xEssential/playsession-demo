import type { NextPage } from 'next';
import React, { useContext, useState } from 'react';

import { Button, Link, Pill, Tabs } from '../components';
import AuthenticateBurnerWallet from '../components/AuthenticateBurnerWallet';
import IncrementNFTCounter from '../components/IncrementNFTCounter';
import { HedgehogContext, messages } from '../contexts/hedgehogContext';
import { Web3Context } from '../contexts/web3context';

// Initialize Firebase
const Home: NextPage = () => {
  const { onboard, address } = useContext(Web3Context);
  const {
    hedgehog,
    signedIn,
    handleSignUp,
    hedgehogLoading,
    handleLogin,
    logout,
    errorMessage,
  } = useContext(HedgehogContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (i) => {
    setActiveTab(i);
  };

  return (
    <div className="app">
      {signedIn ? (
        <div className="message">
          <Pill text="authenticated" />
          <h1>{messages.signedIn.header}</h1>
          <p>{messages.signedIn.body}</p>
          <p>Your Burner address is:</p>
          <p className="address">{hedgehog.getWallet().getAddressString()}</p>
          <Button loading={hedgehogLoading} onClick={logout} text="Log Out" />

          {address ? (
            <>
              <p>Your Primary address is:</p>
              <p className="address">{address}</p>
              <AuthenticateBurnerWallet />
              <IncrementNFTCounter />
            </>
          ) : (
            <Button
              loading={false}
              onClick={async () => {
                await onboard?.walletSelect();
                await onboard?.walletCheck();
              }}
              text="Connect Primary Wallet"
            />
          )}
        </div>
      ) : (
        <>
          <Tabs
            tabs={['Create Account', 'Log In']}
            activeTab={activeTab}
            setActiveTab={changeTab}
          >
            {/* Create Account Tab */}
            <div className="form">
              <div className="fields">
                <input
                  className={errorMessage && !username ? 'error' : null}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={errorMessage ? 'error' : null}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
                <div>
                  <input
                    className={errorMessage ? 'error' : null}
                    placeholder="Confirm Password"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type="password"
                  />
                  <p className="error">{errorMessage}</p>
                </div>
              </div>
              <div className="buttons">
                <Button
                  onClick={() =>
                    handleSignUp({ username, password, passwordConfirmation })
                  }
                  fullWidth
                  loading={hedgehogLoading}
                  text="Create My Account"
                />
                <Link
                  onClick={() => changeTab(1)}
                  text="I already have an account."
                />
              </div>
            </div>

            {/* Log In Tab */}
            <div className="form">
              <div className="fields">
                <input
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div>
                  <input
                    className={errorMessage ? 'error' : null}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <p className="error">{errorMessage}</p>
                </div>
              </div>
              <div className="buttons">
                <Button
                  onClick={() => handleLogin({ username, password })}
                  fullWidth
                  loading={hedgehogLoading}
                  text="Log In"
                />
                <Link onClick={() => changeTab(0)} text="Create Account" />
              </div>
            </div>
          </Tabs>

          <div className="message unauthenticated">
            <Pill text="unauthenticated" />
            <h1>{messages.signedOut.header}</h1>
            <p>{messages.signedOut.body}</p>
            <p>{messages.signedOut.instructions}</p>
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
