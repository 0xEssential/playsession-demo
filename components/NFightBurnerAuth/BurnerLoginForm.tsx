import React, { ReactElement, useContext, useState } from 'react';

import { Button, Link, Pill, Tabs } from '~components';
import { HedgehogContext } from '~contexts/hedgehogContext';

const BurnerLoginForm = (): ReactElement => {
  const {
    hedgehog,
    signedIn,
    handleSignUp,
    hedgehogLoading,
    handleLogin,
    errorMessage,
  } = useContext(HedgehogContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (i) => {
    setActiveTab(i);
  };

  if (signedIn)
    return (
      <>
        <Pill color="green" text="burner authenticated" />
        <p>Your browser will sign game moves automatically from</p>
        <p className="address">{hedgehog.getWallet().getAddressString()}</p>
      </>
    );

  return (
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
              handleSignUp({
                username,
                password,
                passwordConfirmation,
              })
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
  );
};
export default BurnerLoginForm;
