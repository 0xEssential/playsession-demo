/* eslint-disable */

// components and styles borrowed from Audius Hedgehog example
// https://codesandbox.io/s/pp9zzv2n00

import React from 'react';

const Tabs = (props) => {
  return (
    <div className="tabs">
      <div className="headers">
        {props.tabs.map((tab, i) => (
          <div
            key={i}
            onClick={() => props.setActiveTab(i)}
            className={i === props.activeTab ? 'tab active' : 'tab'}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="content">{props.children[props.activeTab]}</div>
    </div>
  );
};

const Pill = ({ text, color}) => {
  return <div className={`pill ${color}`}>{text}</div>;
};

const Spinner = (props) => {
  return (
    <div className="spinner">
      <div />
    </div>
  );
};

const Button = (props) => {
  let styles = 'button';
  if (props.fullWidth) styles += ' fullWidth';
  if (props.loading) styles += ' loading';
  if (props.className) styles += ` ${props.className}`;

  return (
    <div
      onClick={() => (props.loading ? {} : props.onClick())}
      className={styles}
    >
      {props.loading ? <Spinner /> : null}
      {props.text}
    </div>
  );
};

const Link = ({ onClick, text }) => {
  return (
    <div onClick={onClick} className="link">
      <span>{text}</span>
    </div>
  );
};

export { Link, Button, Pill, Tabs };
